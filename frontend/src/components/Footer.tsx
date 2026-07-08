import React from "react";

const BusMarkIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="12" rx="2" stroke="#4ade80" strokeWidth="2" />
    <path d="M3 11H21" stroke="#4ade80" strokeWidth="2" />
    <circle cx="7.5" cy="19" r="1.4" fill="#4ade80" />
    <circle cx="16.5" cy="19" r="1.4" fill="#4ade80" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#94a3b8" strokeWidth="1.8" />
    <path d="M3.5 6.5L12 13L20.5 6.5" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.5 3.5h3l1.5 4.5-2 1.5a11 11 0 0 0 5 5l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2C10 19 5 14 5 5.5a2 2 0 0 1 1.5-2z"
      stroke="#94a3b8"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const PinIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z"
      stroke="#94a3b8"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.5" r="2.5" stroke="#94a3b8" strokeWidth="1.8" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 5.5c-.7.4-1.5.6-2.3.8a3.6 3.6 0 0 0-6.2 3.3A10.2 10.2 0 0 1 3.5 5.9a3.6 3.6 0 0 0 1.1 4.8c-.6 0-1.2-.2-1.7-.4v.1a3.6 3.6 0 0 0 2.9 3.6 3.7 3.7 0 0 1-1.6.1 3.6 3.6 0 0 0 3.4 2.5A7.3 7.3 0 0 1 2.5 18a10.3 10.3 0 0 0 15.9-9.2c.7-.5 1.3-1.2 1.8-1.9-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2z"
      fill="#94a3b8"
    />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="#94a3b8" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4" stroke="#94a3b8" strokeWidth="1.8" />
    <circle cx="17.2" cy="6.8" r="1" fill="#94a3b8" />
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="#94a3b8" strokeWidth="1.8" />
    <path d="M8 10.5V17" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="7.3" r="1" fill="#94a3b8" />
    <path d="M12 17V13.2c0-1.2.9-2 2-2s2 .8 2 2V17" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Bus Travel",
    links: [
      { label: "Search Buses", href: "/buses" },
      { label: "Popular Routes", href: "/routes" },
      { label: "Bus Operators", href: "/operators" },
      { label: "Cancellation Policy", href: "/cancellation" },
    ],
  },
  {
    title: "EV Charging",
    links: [
      { label: "Find a Charging Hub", href: "/ev-hubs" },
      { label: "Highway Charging Map", href: "/ev-map" },
      { label: "Charging Plans", href: "/ev-plans" },
      { label: "Partner Your Station", href: "/ev-partner" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  },
];

const SOCIALS = [
  { icon: <TwitterIcon />, label: "Twitter", href: "https://twitter.com" },
  { icon: <InstagramIcon />, label: "Instagram", href: "https://instagram.com" },
  { icon: <LinkedinIcon />, label: "LinkedIn", href: "https://linkedin.com" },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f2038] font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 lg:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BusMarkIcon />
              <span className="text-white font-extrabold text-lg tracking-tight">
                RouteVolt
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[280px] mb-5">
              India&rsquo;s unified platform for intercity bus travel and EV
              charging &mdash; connecting every highway, one route at a time.
            </p>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <MailIcon />
                support@routevolt.in
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <PhoneIcon />
                1800&ndash;123&ndash;4567
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <PinIcon />
                Hyderabad, Telangana, India
              </li>
            </ul>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-white text-sm font-bold tracking-wide mb-4">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-green-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10 my-10" />

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-5">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            &copy; {year} RouteVolt Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;