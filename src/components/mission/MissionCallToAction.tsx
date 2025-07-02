// src/components/mission/MissionCallToAction.tsx

const phoneNumber = "902985139";

export default function MissionCallToAction() {
  const actions = [
    {
      id: "donation",
      label: "Haz una Donación",
      icon: "❤️",
      message: "¡Hola! Estoy interesado en hacer una donación para apoyar la misión del albergue."
    },
    {
      id: "volunteer",
      label: "Ser Voluntario",
      icon: "🤝",
      message: "¡Hola! Me gustaría saber cómo puedo ser voluntario y colaborar con la misión del albergue."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 bg-red-400 text-center rounded-xl font-fam-two mb-20">
      <h2 className="text-2xl font-bold text-red-700 mb-6">
        ¿Quieres formar parte de nuestra misión?
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {actions.map(action => {
          const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(action.message)}`;
          const baseClasses = "inline-block px-6 py-3 rounded-full font-semibold shadow transition";
          const btnClasses = action.id === "donation"
            ? `${baseClasses} bg-red-700 text-white hover:bg-red-800`
            : `${baseClasses} bg-white text-red-700 border border-red-700 hover:bg-gray-100`;

          return (
            <a
              key={action.id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={btnClasses}
            >
              <span className="mr-2 inline-block text-lg">{action.icon}</span>
              {action.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
