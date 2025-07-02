//src/pages/contacto/Contacto.tsx
import React from "react";
import ContactoHeader from "./ContactoHeader";
import ContactoInfo from "./ContactoInfo";
import ContactoForm from "./ContactoForm";

const Contacto: React.FC = () => {
  return (
    <>
      <ContactoHeader />
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-8 lg:px-16">
          <ContactoInfo />
          <ContactoForm />
        </div>
      </section>
    </>
  );
};

export default Contacto;
