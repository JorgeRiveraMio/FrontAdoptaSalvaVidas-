// src/components/adopt/WhyAdoptSection.tsx

import { FaHeart, FaClipboardCheck, FaGraduationCap } from "react-icons/fa";

export default function WhyAdoptSection() {
  const features = [
    {
      id: "rescate",
      icon: <FaHeart className="text-red-700 text-2xl" />,
      title: "Rescate y Rehabilitación",
      description: "Rescatamos perros abandonados y maltratados, ofreciendo atención veterinaria, rehabilitación y entrenamiento para prepararlos para su hogar definitivo."
    },
    {
      id: "responsable",
      icon: <FaClipboardCheck className="text-red-700 text-2xl" />,
      title: "Adopción Responsable",
      description: "Nuestro proceso de adopción asegura que cada perro se empareje con la familia adecuada, garantizando éxito tanto para la mascota como para los adoptantes."
    },
    {
      id: "educacion",
      icon: <FaGraduationCap className="text-red-700 text-2xl" />,
      title: "Educación Comunitaria",
      description: "Brindamos apoyo y capacitación continua a adoptantes y la comunidad sobre tenencia responsable y bienestar animal."
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-12"> 
        <h2 className="text-3xl font-bold text-red-700 mb-2 font-fam-two">¿Por qué adoptar con nosotros?</h2>
        <p className="text-gray-600">
          Estamos dedicados a darle a cada perro una segunda oportunidad de ser feliz mediante prácticas de adopción responsable.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(feature => (
          <div key={feature.id} className="bg-white rounded-lg shadow p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4 inline-block">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}