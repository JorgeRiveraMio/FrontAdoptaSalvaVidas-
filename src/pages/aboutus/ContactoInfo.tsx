//src/pages/contacto/ContactoInfo.tsx

const ContactoInfo: React.FC = () => {
  return (
    <div className="flex flex-col font-fam-ge">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-700 font-fam-desk">
        Contáctanos <br />
        fácilmente
      </h2>
      <p className="text-lg mb-6 font-fam-two">
        Ya sea que estés interesado en adoptar, ser voluntario, donar o simplemente conocer más
        sobre nuestro trabajo, no dudes en escribirnos.
      </p>

      <ul className="space-y-4 text-gray-800 text-md font-fam-two">
        <li className="flex items-start gap-3">
          <div>
            <a
              href="tel:+51955288116"
              className="block hover:text-red-500 transition-colors mb-2"
            >
              <i className="fa-solid fa-phone text-red-400 text-lg mr-2"></i>
              +51 955 288 116
            </a>
            <p className="text-gray-600 text-base">
              Lunes a Viernes 8:00am - 20:00pm
              <br />
              Sábados y domingos 8:00am - 17:00pm
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div>
            <a
              href="mailto:albergue.adoptasalvavidas@gmail.com"
              className="block hover:text-red-500 transition-colors break-all"
            >
              <i className="fa-solid fa-envelope text-red-400 text-lg mr-2"></i>
              albergue.adoptasalvavidas@gmail.com
            </a>
          </div>
        </li>
      </ul>

      <p className="mt-6 text-gray-600 text-lg font-fam-two">
        Nuestro equipo está listo para brindarte toda la información que necesites. ¡Gracias por apoyar una causa que da esperanza!
      </p>
    </div>
  );
};

export default ContactoInfo;
