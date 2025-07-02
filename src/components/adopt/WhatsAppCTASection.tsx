// src/components/home/WhatsAppCTASection.tsx

const phoneNumber = "955288116"; 
const supportOptions = [
  
  {
    id: "donate",
    icon: "❤️",
    title: "Donar Mensual",
    actionLabel: "Donar Mensual",
    message: "¡Hola! Quiero apoyar con una donación mensual. ¿Cómo puedo hacerlo?"
  },
  {
    id: "volunteer",
    icon: "🤝",
    title: "Ser Voluntario",
    actionLabel: "Ser Voluntario",
    message: "¡Hola! Me gustaría saber cómo puedo ser voluntario en el refugio."
  }
];

export default function WhatsAppCTASection() {
  return (
    <section
      className="relative py-16 px-4 text-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('https://media.istockphoto.com/id/1388281684/es/vector/patrón-de-perro-sin-costuras-con-huellas-de-patas-huesos-corazones-y-bolas-textura-de-pie-de.webp?s=1024x1024&w=is&k=20&c=DQnTKlSD_MPNyOpC-eIz4z6RMMlkbJDnO7-EUs2H87I=')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-red-700/60" />

      <div className="relative z-10 max-w-4xl mx-auto font-fam-two">
        <h2 className="text-4xl font-bold mb-4">¿Listo para Cambiar una Vida?</h2>
        <p className="mb-8">
          Ya sea que quieras adoptar, donar o ser voluntario, hay muchas maneras de ayudar a nuestros perritos rescatados.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {supportOptions.map(option => {
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(option.message)}`;
            // Estilos de botón
            const baseClasses = "inline-block px-6 py-3 font-semibold rounded-full shadow transition";
            let btnClasses = `${baseClasses} bg-white text-red-700 hover:bg-gray-100`;
            if (option.id === 'donate') btnClasses = `${baseClasses} bg-yellow-400 text-gray-900 hover:bg-yellow-500`;
            return (
              <a
                key={option.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={btnClasses}
              >
                <span className="mr-2 text-xl inline-block">{option.icon}</span>
                {option.actionLabel}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
