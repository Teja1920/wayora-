import React from "react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Buses", href: "/buses" },
  { label: "EV Hubs", href: "/ev-hubs" },
];

interface NavbarProps {
  activePath?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activePath = "/" }) => {
  return (
    <header className="bg-[#163157] px-4 sm:px-10 h-[68px] flex items-center border-b border-white/5">
      <div className="w-full max-w-[1360px] mx-auto flex items-center justify-between">
          <a href="/" aria-label="BharatGo home" className="no-underline flex items-center gap-2.5">
          <span className="w-[34px] h-[34px] rounded-[9px] bg-green-500 flex items-center justify-center shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="6" width="20" height="12" rx="2" stroke="white" strokeWidth="2" />
              <path d="M2 11H22" stroke="white" strokeWidth="2" />
              <circle cx="7" cy="18" r="1.6" fill="white" />
              <circle cx="17" cy="18" r="1.6" fill="white" />
            </svg>
          </span>
          <span className="text-white text-xl font-bold tracking-tight">BharatGo</span>
          <span className="text-green-400 text-sm font-semibold ml-0.5">+ EV</span>
          </a>

        <nav className="flex items-center gap-1.5" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === activePath;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`no-underline text-[15px] font-medium px-4 py-2.5 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400 focus-visible:outline-offset-2 ${
                  isActive ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;