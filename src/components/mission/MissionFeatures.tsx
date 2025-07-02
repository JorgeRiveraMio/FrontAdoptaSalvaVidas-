import { FaHeart, FaUserCheck, FaGraduationCap } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

export default function MissionFeatures() {
  const features = [
    {
      id: "rescate",
      icon: <FaHeart className="text-red-700 text-4xl" />,
      title: "Rescate y Rehabilitación",
      description: "Proporcionamos atención médica y rehabilitación a perros abandonados."
    },
    {
      id: "adopcion",
      icon: <FaUserCheck className="text-red-700 text-4xl" />,
      title: "Adopción Responsable",
      description: "Emparejamos familias con el compañero perfecto mediante un proceso cuidadoso."
    },
    {
      id: "educacion",
      icon: <FaGraduationCap className="text-red-700 text-4xl" />,
      title: "Educación Comunitaria",
      description: "Capacitamos a la comunidad en tenencia responsable y bienestar animal."
    }
  ];

  return (
    <section className="pb-20 px-4 bg-white font-fam-one text-center font-fam-two">
      <div className="max-w-6xl mx-auto mb-12">
        <p className="text-gray-600 text-lg max-w-5xl mx-auto font-fam-two">
          En nuestro albergue trabajamos día a día por un futuro mejor para cada perrito, con el agradecimiento
          a los voluntariados, donaciones y apoyo de organizaciones con el mismo objetivo.
          Estas son nuestras acciones clave:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map(feature => (
          <div
            key={feature.id}
            className="bg-white rounded-2xl flex flex-col items-center"
          >
            <div className="mb-6 bg-red-100 p-5 rounded-full flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-red-700 mb-3">{feature.title}</h3>
            <p className="text-gray-600 text-md font-fam-two">{feature.description}</p>
          </div>
        ))}
      </div>
      <Button
              as={Link}
              to="/adopta"
              color="secondary"
              size="lg"
              className="font-fam-two mt-8 bg-yellow-400 text-gray-900 rounded-full font-bold px-8 py-4 shadow-lg hover:bg-yellow-500 transition"
            >
              Huellitas rescatadas <i className="fa-solid fa-paw"></i>
      </Button>
    </section>
  );
}
