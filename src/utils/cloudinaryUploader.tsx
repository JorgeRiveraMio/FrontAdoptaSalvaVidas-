// src/utils/cloudinaryUploader.tsx

export function uploadImagesToCloudinary(): Promise<{ id: number; url: string }[]> {
  return new Promise((resolve, reject) => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      script.onload = () => startWidget();
      script.onerror = () =>
        reject(new Error("No se pudo cargar el script de Cloudinary"));
      document.body.appendChild(script);
    } else {
      startWidget();
    }

    function startWidget() {
      const imageUrls: { id: number; url: string }[] = [];

      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dozvhoggx",
          uploadPreset: "perros_adopcion",
          folder: "adopta/perros",
          resourceType: "image",
          multiple: true,
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          maxFileSize: 5_000_000,
        },
        (error: any, result: any) => {
          if (!error && result?.event === "success") {
            imageUrls.push({
              id: -1,
              url: result.info.secure_url,
            });
          }

          if (result?.event === "close") {
            resolve(imageUrls);
          }
        }
      );

      widget.open();
    }
  });
}
