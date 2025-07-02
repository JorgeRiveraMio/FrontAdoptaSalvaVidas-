import { useEffect, useState } from "react";
import DogTree from '/src/assets/image/home/dog_tree.jpg';
import DogTwo from "/src/assets/image/home/op_dog.jpg";
import DogThree from "/src/assets/image/home/happy.jpg";

const images = [DogTree, DogTwo, DogThree];
const ImpactoOp: React.FC = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length); // bucle
        }, 3000); // cambia cada 3 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section className="w-full bg-white pt-20 px-4 pb-16 font-fam-two">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                    
                    <div className="text-center md:text-left text-black flex flex-col justify-center" data-aos="fade-right">
                    <p className="text-3xl md:text-6xl font-bold font-fam-desk">
                        En el Perú <br />
                        hay <span className="text-red-600">6 millones</span><br />
                        de perritos <br />
                        sin hogar
                    </p>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="relative aspect-[8/16] w-full rounded-xl max-w-sm md:max-w-md overflow-hidden shadow-xl border border-gray-200">
                            {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                                index === current ? "opacity-100" : "opacity-0"
                                }`}
                                alt={`slide-${index}`}
                            />
                            ))}
                        </div>
                    </div>

                    <div className="text-center md:text-right text-black flex flex-col justify-center mt-12 md:mt-40" data-aos="fade-left">
                        <p className="text-3xl md:text-6xl font-bold leading-tight font-fam-desk">
                            Ayúdanos a <br />
                            construir un <br />
                            mejor hogar <br />
                            para ellos
                        </p>
                    </div>
                </div>
                {/* Texto inferior */}
                <div className="mt-16 max-w-4xl mx-auto text-center font-fam-two">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed px-4">
                    Tener un integrante más en la familia es una gran responsabilidad.
                    Ellos esperan cariño y cuidados constantes, y se convierten en compañeros de vida.
                    </p>
                </div>
            </section>
        </>
    );
};

export default ImpactoOp;
