// src/components/home/CallToActionSection.tsx

const phoneNumber = "955288116"; 

const supportOptions = [
  {
    id: "adopt",
    icon: "🐾",
    label: "Adoptar un Perrito",
    message: "¡Hola! Estoy interesado en adoptar un perrito. ¿Cómo puedo comenzar el proceso?"
  },
  {
    id: "donate",
    icon: "❤️",
    label: "Hacer una Donación",
    message: "¡Hola! Quiero hacer una donación para apoyar al refugio. ¿Cómo puedo proceder?"
  },
  {
    id: "volunteer",
    icon: "👥",
    label: "Ser Voluntario",
    message: "¡Hola! Me gustaría saber cómo puedo ser voluntario en el refugio."
  }
];

export default function CallToActionSection() {
  return (
    <section
      className="max-w-7xl mx-auto rounded-xl relative bg-red-700 py-12 px-4 text-center text-white overflow-hidden mb-20"
    >
      {/* Patrón de fondo con baja opacidad */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/ff/22/dd/ff22dd293f162f409e7ba08bbc457fea.jpg')",
          opacity: 0.15
        }}
      />
      {/* Overlay rojo semitransparente */}
      <div className="absolute inset-0 bg-red-700/60" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 font-fam-two ">¿Listo para cambiar una vida?</h2>
        <p className="text-lg mb-6 font-fam">
          Ya sea que quieras adoptar, donar o ser voluntario, tu aporte hace una gran diferencia para nuestros perritos rescatados.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {supportOptions.map(option => {
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(option.message)}`;
            // Definir estilos según opción
            let btnClasses = "px-8 py-3 font-semibold rounded-full shadow transition";
            if (option.id === "adopt") btnClasses += " bg-gray-100 text-red-700 hover:bg-gray-200";
            if (option.id === "donate") btnClasses += " bg-yellow-400 text-gray-900 hover:bg-yellow-500";
            if (option.id === "volunteer") btnClasses += " border border-white text-white hover:bg-white hover:text-red-700";

            return (
              <a
                key={option.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnClasses} inline-block font-fam-two`}
              >
                <span className="mr-2 inline-block text-xl">{option.icon}</span>
                {option.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
