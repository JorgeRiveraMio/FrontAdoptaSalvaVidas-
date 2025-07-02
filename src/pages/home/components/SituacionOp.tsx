import { FaDog, FaHome, FaSyringe, FaUsers } from "react-icons/fa";

const stats = [
    {
        icon: <FaDog className="text-yellow-400 text-5xl mb-2" />,
        number: "+30",
        label: "Animales rescatados",
    },
    {
        icon: <FaUsers className="text-yellow-400 text-5xl mb-2" />,
        number: "+400",
        label: "Voluntarios",
    },
    {
        icon: <FaHome className="text-yellow-400 text-5xl mb-2" />,
        number: "+30",
        label: "Albergues beneficiados",
    },
    {
        icon: <FaSyringe className="text-yellow-400 text-5xl mb-2" />,
        number: "+100",
        label: "Esterilizaciones",
    },
];

const SituacionOp = () => {
    return (
        <section
        className="mb-16 bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: "url('/img/hero.png')" }}
        >
            
            <div className="bg-[#0b2142]/80 py-16 px-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center font-fam-two">
                {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    {stat.icon}
                    <h3 className="text-4xl font-bold font-fam-desk">{stat.number}</h3>
                    <p className="text-md mt-1 font-fam-two">{stat.label}</p>
                </div>
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-10"></div>
        </section>
    );
};

export default SituacionOp;
