import React, { useState } from "react";
import Navbar from "../components/Navbar";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface EvHub {
  name: string;
  highway: string;
  location: string;
  status: "online" | "offline";
  dcFast: number;
  ac: number;
  availableCount: number;
  availableTotal: number;
  waitTime: string;
  pricePerKwh: number;
}

interface BusRoute {
  from: string;
  to: string;
  busCount: number;
  duration: string;
  priceFrom: number;
  highlighted?: boolean;
}

const LocationPinIcon: React.FC<{ color?: string }> = ({ color = "#163157" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.5" r="2.5" stroke={color} strokeWidth="2" />
  </svg>
);

const SwapIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 7h11l-3-3M17 17H6l3 3"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="#163157" strokeWidth="2" />
    <path d="M3 10H21" stroke="#163157" strokeWidth="2" />
    <path d="M8 3V7" stroke="#163157" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 3V7" stroke="#163157" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TravelersIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="8" r="3" stroke="#163157" strokeWidth="2" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#163157" strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="8" r="2.4" stroke="#163157" strokeWidth="1.6" />
    <path d="M17 12.4c2.3 0.3 4 2.4 4 4.6" stroke="#163157" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const SearchIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.2" />
    <path d="M21 21L16.5 16.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const RouteIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 20L20 4M20 4H12M20 4V12"
      stroke="#163157"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BusIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="12" rx="2" stroke="#163157" strokeWidth="2" />
    <path d="M3 11H21" stroke="#163157" strokeWidth="2" />
    <circle cx="7.5" cy="19" r="1.4" fill="#163157" />
    <circle cx="16.5" cy="19" r="1.4" fill="#163157" />
  </svg>
);

const PinIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z"
      stroke="#163157"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.5" r="2.5" stroke="#163157" strokeWidth="2" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#7c8aa0" strokeWidth="2" />
    <path d="M12 7V12L15.5 14" stroke="#7c8aa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LeafIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z"
      stroke="#16a34a"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M5 19c3-3 5-7 6-10" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const TrendUpIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 17L10 10L14 14L21 7"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M15 7H21V13" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RouteBusIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="12" rx="2" stroke="#7c8aa0" strokeWidth="1.8" />
    <path d="M3 11H21" stroke="#7c8aa0" strokeWidth="1.8" />
    <circle cx="7.5" cy="19" r="1.2" fill="#7c8aa0" />
    <circle cx="16.5" cy="19" r="1.2" fill="#7c8aa0" />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="#94a3b8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ROUTES: BusRoute[] = [
  { from: "Delhi", to: "Jaipur", busCount: 48, duration: "5h", priceFrom: 420, highlighted: true },
  { from: "Mumbai", to: "Pune", busCount: 82, duration: "3.5h", priceFrom: 380 },
  { from: "Bengaluru", to: "Chennai", busCount: 56, duration: "6h", priceFrom: 680 },
  { from: "Hyderabad", to: "Bengaluru", busCount: 41, duration: "10h", priceFrom: 750 },
  { from: "Delhi", to: "Agra", busCount: 35, duration: "3h", priceFrom: 290 },
  { from: "Mumbai", to: "Nashik", busCount: 44, duration: "4h", priceFrom: 320 },
];

const QUICK_DATES = ["Today", "Tomorrow", "This Weekend"] as const;



const EV_HUBS: EvHub[] = [
  {
    name: "Tata Power EV Hub \u2013 Surat",
    highway: "NH-48",
    location: "Surat, Gujarat",
    status: "online",
    dcFast: 4,
    ac: 8,
    availableCount: 5,
    availableTotal: 12,
    waitTime: "~10 min",
    pricePerKwh: 18,
  },
  {
    name: "BPCL Pulse Station \u2013 Vadodara",
    highway: "NH-48",
    location: "Vadodara, Gujarat",
    status: "online",
    dcFast: 6,
    ac: 6,
    availableCount: 2,
    availableTotal: 12,
    waitTime: "~35 min",
    pricePerKwh: 16,
  },
  {
    name: "Ather Grid \u2013 Nashik",
    highway: "NH-160",
    location: "Nashik, Maharashtra",
    status: "online",
    dcFast: 3,
    ac: 10,
    availableCount: 8,
    availableTotal: 13,
    waitTime: "No wait",
    pricePerKwh: 20,
  },
  {
    name: "ChargeZone Mega Hub \u2013 Pune",
    highway: "NH-48",
    location: "Pune, Maharashtra",
    status: "online",
    dcFast: 8,
    ac: 12,
    availableCount: 11,
    availableTotal: 20,
    waitTime: "No wait",
    pricePerKwh: 19,
  },
  {
    name: "Statiq \u2013 Jaipur Expressway",
    highway: "NH-48",
    location: "Kotputli, Rajasthan",
    status: "offline",
    dcFast: 2,
    ac: 6,
    availableCount: 0,
    availableTotal: 8,
    waitTime: "~60 min",
    pricePerKwh: 15,
  },
  {
    name: "Adani TotalEnergies \u2013 Ahmedabad",
    highway: "NH-47",
    location: "Ahmedabad, Gujarat",
    status: "online",
    dcFast: 10,
    ac: 10,
    availableCount: 7,
    availableTotal: 20,
    waitTime: "~5 min",
    pricePerKwh: 17,
  },
];

const STATS: Stat[] = [
  { icon: <RouteIcon />, value: "1.4L km", label: "National Highways" },
  { icon: <BusIcon />, value: "2.1M+", label: "Registered Buses" },
  { icon: <PinIcon />, value: "4,800+", label: "Cities Connected" },
];

const Home: React.FC = () => {
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Jaipur");
  const [date, setDate] = useState("2025-01-15");
  const [travelers, setTravelers] = useState(1);
  const [activeQuickDate, setActiveQuickDate] = useState<string | null>(null);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    console.log({ from, to, date, travelers });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans">
      <Navbar activePath="/" />

      <section className="bg-gradient-to-br from-[#14294b] via-[#1c3a63] to-[#1e3f6b] px-4 sm:px-10 pt-14 pb-24 sm:pb-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <p className="inline-flex items-center gap-2 text-green-400 text-sm font-medium mb-6">
            <span aria-hidden="true">🍃</span>
            1.4 Lakh km Network &middot; 2.1M Buses &middot; Tier 1&ndash;3 Connectivity
          </p>

          <h1 className="mb-5 text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-extrabold tracking-tight">
            <span className="block text-white">Book Buses.</span>
            <span className="block text-green-400">Find EV Chargers.</span>
          </h1>

          <p className="max-w-[520px] text-slate-300 text-[17px] leading-relaxed mb-10">
            India&rsquo;s unified platform for intercity travel and electric vehicle
            charging across all national highways.
          </p>

          <div className="bg-white rounded-[18px] p-5 sm:p-7 pb-6 shadow-[0_20px_60px_rgba(6,20,45,0.35)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="from" className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                  From
                </label>
                <div className="flex items-center gap-2.5 bg-slate-100 border border-transparent focus-within:border-[#163157] rounded-[10px] px-3.5 py-3 transition-colors">
                  <LocationPinIcon />
                  <input
                    id="from"
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="border-none bg-transparent outline-none text-[15px] font-semibold text-slate-800 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="to" className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                  To
                </label>
                <div className="relative flex items-center gap-2.5 bg-slate-100 border border-transparent focus-within:border-[#163157] rounded-[10px] px-3.5 py-3 pr-11 transition-colors">
                  <LocationPinIcon color="#16a34a" />
                  <input
                    id="to"
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="border-none bg-transparent outline-none text-[15px] font-semibold text-slate-800 w-full"
                  />
                  <button
                    type="button"
                    onClick={handleSwap}
                    aria-label="Swap from and to"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#163157] flex items-center justify-center cursor-pointer"
                  >
                    <SwapIcon />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                  Date
                </label>
                <div className="flex items-center gap-2.5 bg-slate-100 border border-transparent focus-within:border-[#163157] rounded-[10px] px-3.5 py-3 transition-colors">
                  <CalendarIcon />
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-none bg-transparent outline-none text-[15px] font-semibold text-slate-800 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                  Travelers
                </label>
                <div className="flex items-center gap-2.5 bg-slate-100 border border-transparent rounded-[10px] px-3.5 py-3">
                  <TravelersIcon />
                  <button
                    type="button"
                    onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                    aria-label="Decrease travelers"
                    className="w-6 h-6 rounded-full bg-[#163157] text-white text-base leading-none flex items-center justify-center cursor-pointer ml-1"
                  >
                    &minus;
                  </button>
                  <span className="text-[15px] font-bold text-slate-800 min-w-[16px] text-center">
                    {travelers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelers((t) => t + 1)}
                    aria-label="Increase travelers"
                    className="w-6 h-6 rounded-full bg-[#163157] text-white text-base leading-none flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
              <div className="flex gap-2.5 flex-wrap">
                {QUICK_DATES.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveQuickDate(label)}
                    className={`text-[13px] font-semibold px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                      activeQuickDate === label
                        ? "bg-[#163157] border-[#163157] text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:border-[#163157]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white text-[15px] font-bold px-7 py-3.5 rounded-[10px] transition-colors cursor-pointer"
              >
                <SearchIcon />
                Search Buses
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-8 lg:-mt-14 mb-16">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-[0_8px_24px_rgba(15,30,60,0.06)]"
            >
              <div className="w-11 h-11 rounded-[10px] bg-slate-100 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-[22px] font-extrabold text-slate-800 m-0">{stat.value}</p>
                <p className="text-[13px] text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-10 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 m-0">
                Top EV Charging Hubs
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Along major <span className="text-slate-500">National Highways</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 border border-green-200 bg-green-50 text-green-600 text-sm font-semibold px-4 py-1.5 rounded-full">
              <LeafIcon />
              Green Network
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EV_HUBS.map((hub) => (
              <div
                key={hub.name}
                className="bg-white rounded-2xl p-5 shadow-[0_8px_24px_rgba(15,30,60,0.06)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-bold text-slate-800 leading-snug m-0">
                    {hub.name}
                  </h3>
                  <span
                    className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                      hub.status === "online" ? "bg-green-500" : "bg-red-500"
                    }`}
                    aria-label={hub.status === "online" ? "Online" : "Offline"}
                  />
                </div>
                <p className="text-sm text-slate-400 mt-1 mb-4">
                  {hub.highway} &middot; {hub.location}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-green-50 rounded-lg px-2 py-2.5 text-center">
                    <p className="text-[11px] text-green-700/70 m-0">DC Fast</p>
                    <p className="text-[15px] font-bold text-green-700 m-0 mt-0.5">
                      {hub.dcFast}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg px-2 py-2.5 text-center">
                    <p className="text-[11px] text-blue-700/70 m-0">AC</p>
                    <p className="text-[15px] font-bold text-blue-700 m-0 mt-0.5">{hub.ac}</p>
                  </div>
                  <div className="bg-slate-100 rounded-lg px-2 py-2.5 text-center">
                    <p className="text-[11px] text-slate-500 m-0">Available</p>
                    <p
                      className={`text-[15px] font-bold m-0 mt-0.5 ${
                        hub.availableCount === 0 ? "text-red-500" : "text-slate-800"
                      }`}
                    >
                      {hub.availableCount}/{hub.availableTotal}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <ClockIcon />
                    {hub.waitTime}
                  </span>
                  <span className="font-bold text-slate-800">&#8377;{hub.pricePerKwh}/kWh</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-10 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 m-0">
                Trending Bus Routes
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Most booked corridors this week
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full">
              <TrendUpIcon />
              This Week
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROUTES.map((route) => (
              <button
                key={`${route.from}-${route.to}`}
                type="button"
                className={`text-left bg-white rounded-2xl p-5 shadow-[0_8px_24px_rgba(15,30,60,0.06)] border transition-colors cursor-pointer hover:border-blue-300 ${
                  route.highlighted ? "border-blue-300" : "border-transparent"
                }`}
              >
                <h3 className="flex items-center gap-2 text-[17px] font-bold text-slate-800 m-0">
                  {route.from}
                  <ArrowRightIcon />
                  {route.to}
                </h3>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <RouteBusIcon />
                      {route.busCount} buses
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon />
                      {route.duration}
                    </span>
                  </div>
                  <span className="text-green-600 font-bold text-sm whitespace-nowrap">
                    from &#8377;{route.priceFrom}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;