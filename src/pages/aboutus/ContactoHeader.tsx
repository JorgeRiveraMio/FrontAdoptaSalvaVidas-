//src/pages/contacto/ContactoHeader.tsx
import welcome from "@/assets/image/home/welcome.jpg";
const ContactoHeader: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-white to-gray-50 shadow-md">
      <div className="relative w-full h-80 sm:h-96 lg:h-[22rem] overflow-hidden">
        <img
          src={welcome}
          alt="Publicidad"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4 sm:px-8 max-w-3xl text-white">
            <p className="text-center text-lg">Adopta Salva Vidas</p>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight font-fam-desk">
              Contáctenos
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoHeader;
