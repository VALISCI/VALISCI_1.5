// app/Header.tsx
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-black/10">
      <div className="mx-auto max-w-[1200px] px-6 py-2 lg:py-1 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/valisci_logo.svg"
            alt="VALISCI"
            width={768}
            height={192}
            priority
            className="h-16 md:h-24 lg:h-48 w-auto"
          />
        </div>

        {/* Primary nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
          <a href="#doctrine" className="hover:text-neutral-900">Doctrine</a>
          <a href="#ethos" className="hover:text-neutral-900">Ethos</a>
          <a href="#systems" className="hover:text-neutral-900">Systems</a>
          <a href="#industries" className="hover:text-neutral-900">Industries</a>
          <a href="#brief" className="hover:text-neutral-900">Brief</a>
          <a href="#contact" className="hover:text-neutral-900">Contact</a>
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex px-4 py-2 rounded-[16px] bg-[#00C7E3] text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#00C7E3] active:translate-y-px transition"
        >
          Initiate
        </a>
      </div>
    </header>
  );
}
