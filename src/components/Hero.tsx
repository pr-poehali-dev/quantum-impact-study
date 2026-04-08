import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/c0271dda-b616-44ea-8d09-89d235f2682b/files/ad9aa175-b728-45c1-8b61-08754d8c2ef4.jpg"
          alt="Мемориальный пейзаж"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40 z-[1]" />
      <div className="relative z-10 text-center text-white px-6">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 opacity-80">Ритуальные услуги · Круглосуточно</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
          С ЗАБОТОЙ<br />О БЛИЗКИХ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
          Полный комплекс ритуальных услуг: гробы, гранитные памятники, кресты и благоустройство могил. Мы рядом в трудный момент.
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-black px-8 py-3 uppercase tracking-wide text-sm font-medium hover:bg-neutral-200 transition-colors duration-300"
        >
          Позвонить нам
        </a>
      </div>
    </div>
  );
}