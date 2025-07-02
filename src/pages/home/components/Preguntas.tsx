// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";
import {Accordion, AccordionItem} from "@heroui/accordion";

type Pregunta = {
    id: string;
    pregunta: string;
    respuesta: string;
};

const faqs: Pregunta[] = [
    {
        id: "faq1",
        pregunta: "¿Dónde se encuentra ubicado el albergue?",
        respuesta:
        "Nos encontramos a solo 5 minutos de la estación central del metro (línea 3), caminando hacia el norte. Puedes ver nuestra ubicación exacta en la sección de Contacto.",
    },
    {
        id: "faq2",
        pregunta: "¿Qué pasos debo seguir para adoptar un perrito?",
        respuesta:
        "Primero, completa el formulario en la sección de Contacto. Luego, nos comunicaremos contigo para coordinar una visita y una breve entrevista. Queremos asegurarnos de que cada perrito encuentre un hogar responsable y amoroso.",
    },
    {
        id: "faq3",
        pregunta: "¿Cómo puedo ayudar al albergue?",
        respuesta:
        "Puedes colaborar donando alimento, medicinas, implementos de limpieza o con tu tiempo como voluntario.",
    },
    {
        id: "faq4",
        pregunta: "¿Qué requisitos necesito para adoptar?",
        respuesta:
        "Ser mayor de edad, contar con un espacio adecuado en casa, comprometerse con el bienestar del perrito, y aceptar una visita previa o seguimiento post-adopción.",
    },
    {
        id: "faq5",
        pregunta: "¿Qué incluye la adopción?",
        respuesta:
        "Todos nuestros perritos se entregan desparasitados, vacunados y esterilizados (si tienen la edad apropiada). Además, recibirás recomendaciones de cuidado.",
    },
];

export default function Preguntas(): JSX.Element {
    return (
        <section className="w-full px-6 pb-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-1 gap-10 items-center">
                {/* Preguntas frecuentes */}
                    <div>
                    <h2 className="text-5xl text-center font-bold mb-6 font-fam-desk"><span className="text-[#cb3240]">Preguntas</span> frecuentes</h2>
                    <p className="text-gray-500 text-lg text-center mb-7 font-fam-desk">
                        Entre las preguntas más concurridas de los usuarios están: 
                    </p>
                    <Accordion selectionMode="multiple" className="text-black font-fam-two text-base">
                        {faqs.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            aria-label={faq.pregunta}
                            title={faq.pregunta}
                        >
                            {faq.respuesta}
                        </AccordionItem>
                        ))}
                    </Accordion>
                    </div>
                </div>
        </section>
    );
}


