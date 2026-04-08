const items = [
  {
    title: "Гранитные памятники",
    desc: "Изготовление и установка из натурального гранита с гравировкой",
    img: "https://cdn.poehali.dev/projects/c0271dda-b616-44ea-8d09-89d235f2682b/files/749c4d57-e3d3-4776-9dfb-98d4f58ecf26.jpg",
  },
  {
    title: "Гробы и саркофаги",
    desc: "Широкий выбор из натурального дерева и МДФ, классические и современные модели",
    img: "https://cdn.poehali.dev/projects/c0271dda-b616-44ea-8d09-89d235f2682b/files/9d1c6f66-7144-43b6-8cbb-0e0a70ab388a.jpg",
  },
  {
    title: "Кресты и ограды",
    desc: "Металлические, деревянные и гранитные кресты, кованые и сварные ограды",
    img: "https://cdn.poehali.dev/projects/c0271dda-b616-44ea-8d09-89d235f2682b/files/095626d2-ad1d-4719-ac21-5ec1597c46e7.jpg",
  },
];

export default function Gallery() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">Наши товары</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-10">Широкий ассортимент</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="group overflow-hidden bg-white">
              <div className="overflow-hidden h-64">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-4 pb-6 px-1">
                <p className="font-semibold text-black mb-1">{item.title}</p>
                <p className="text-neutral-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
