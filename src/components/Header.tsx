interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-sm uppercase tracking-wide">Ритуал 13</div>
        <nav className="flex items-center gap-6 sm:gap-8">
          <a href="#services" className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm hidden sm:block">
            Услуги
          </a>
          <a href="#contact" className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm hidden sm:block">
            Связаться
          </a>
        </nav>
      </div>
    </header>
  );
}