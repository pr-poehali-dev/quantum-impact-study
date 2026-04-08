const services = [
  { title: "Гробы и гробы-саркофаги", desc: "Широкий выбор моделей из натурального дерева и МДФ. Классические и современные исполнения." },
  { title: "Гранитные памятники", desc: "Изготовление и установка памятников из натурального гранита с гравировкой по фото." },
  { title: "Кресты и ограды", desc: "Металлические, деревянные и гранитные кресты. Ограды из профильной трубы и кованые варианты." },
  { title: "Благоустройство могил", desc: "Укладка плитки, посев газона, озеленение, уборка — полный уход за местом захоронения." },
];

export default function Featured() {
  return (
    <div id="services" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="/images/mountain-landscape.jpg"
          alt="Спокойный природный пейзаж"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Полный комплекс услуг</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Берём на себя все заботы — от организации похорон до долгосрочного ухода за могилой.
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {services.map((s) => (
            <div key={s.title} className="border-t border-neutral-200 pt-4">
              <p className="font-semibold text-neutral-900 mb-1">{s.title}</p>
              <p className="text-neutral-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Узнать цены
        </button>
      </div>
    </div>
  );
}