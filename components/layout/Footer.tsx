import { LinkedinLogo, InstagramLogo, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import content from "@/data/content.json";

export function Footer() {
  const { footer } = content;

  return (
    <footer className="bg-[#1A1A18] border-t-2 border-tertiary">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          {/* Col 1: Brand */}
          <div>
            <div className="mb-3">
              <img
                src="/Logo JES.svg"
                alt="Jugamos en Serio"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-neutral-400 text-sm max-w-xs mt-3 leading-relaxed">
              {footer.tagline}
            </p>
            <div className="flex items-center gap-2 mt-4 text-neutral-400 text-sm">
              <EnvelopeSimple size={16} />
              <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors">
                {footer.email}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-2 text-neutral-400 text-sm">
              <MapPin size={16} />
              <span>{footer.cities}</span>
            </div>
            <div className="flex gap-4 mt-6">
              {footer.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  aria-label={s.platform}
                  className="text-neutral-400 hover:text-tertiary transition-colors"
                >
                  {s.platform === "LinkedIn" ? (
                    <LinkedinLogo size={22} weight="fill" />
                  ) : (
                    <InstagramLogo size={22} weight="fill" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Nav */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Navegación
            </p>
            <nav className="flex flex-col gap-3">
              {footer.nav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Contacto
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#contacto"
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                Agendar una conversación
              </a>
              <a
                href={`mailto:${footer.email}`}
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                Escribirnos directamente
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600">{footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
