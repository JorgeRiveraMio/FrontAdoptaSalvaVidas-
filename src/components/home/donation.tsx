import home_s from "@/assets/image/home/home_s.png";
import home_a from "@/assets/image/home/home_a.png";
import home_c from "@/assets/image/home/home_c.png";
const supportOptions = [
  {
    id: "basic",
    image: home_a,
    title: "Alimentación y Cuidado",
    description: "Proporciona comidas nutritivas y cuidados diarios a nuestros perritos.",
    actionLabel: "Donar Mensual",
    message: "¡Hola! Estoy interesado en la Alimentación y Cuidado. ¿Podrían indicarme cómo proceder?"
  },
  {
    id: "medical",
    image: home_s,
    title: "Atención Médica",
    description: "Ayuda a cubrir gastos veterinarios de perritos rescatados.",
    actionLabel: "Donar Mensual",
    message: "¡Hola! Quiero apoyar con la Atención Médica. ¿Cómo puedo hacerlo?"
  },
  {
    id: "sponsor",
    image: home_c,
    title: "Patrocinio Completo",
    description: "Patrocina el cuidado completo de un perrito hasta su adopción.",
    actionLabel: "Donar Mensual",
    message: "¡Hola! Me interesa el Patrocinio Completo. ¿Podrían brindarme detalles?"
  }
];

export default function Donation() {
  return (
    <section className="max-w-7xl mx-auto pt-5 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-fam-two">
        {supportOptions.map((option, index) => {
          const isLast = index === supportOptions.length - 1;

          return (
            <div
              key={option.id}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col p-6 ${
                isLast ? 'md:col-span-2' : ''
              }`}
            >
              <div className="mb-4 flex justify-center">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center text-base">{option.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
