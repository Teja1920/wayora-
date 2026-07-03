import React, { useMemo, useState } from "react";

interface Station {
  id: string;
  name: string;
  highway: string;
  location: string;
  dcFast: number;
  ac: number;
  freeCount: number;
  totalCount: number;
  waitTime: string;
  pricePerKwh: number;
  status: "available" | "unavailable";
  mapX: number;
  mapY: number;
  mapLabel: string;
}

type StationFilter = "All Stations" | "Available Now" | "DC Fast Charge";

const STATION_FILTERS: StationFilter[] = ["All Stations", "Available Now", "DC Fast Charge"];
const HIGHWAYS = ["NH-48", "NH-47", "NH-160"] as const;

const STATIONS: Station[] = [
  {
    id: "tata-surat",
    name: "Tata Power EV Hub \u2013 Surat",
    highway: "NH-48",
    location: "Surat, Gujarat",
    dcFast: 4,
    ac: 8,
    freeCount: 5,
    totalCount: 12,
    waitTime: "~10 min",
    pricePerKwh: 18,
    status: "available",
    mapX: 674,
    mapY: 361,
    mapLabel: "5/12",
  },
  {
    id: "bpcl-vadodara",
    name: "BPCL Pulse Station \u2013 Vadodara",
    highway: "NH-48",
    location: "Vadodara, Gujarat",
    dcFast: 6,
    ac: 6,
    freeCount: 2,
    totalCount: 12,
    waitTime: "~35 min",
    pricePerKwh: 16,
    status: "available",
    mapX: 546,
    mapY: 445,
    mapLabel: "2/12",
  },
  {
    id: "ather-nashik",
    name: "Ather Grid \u2013 Nashik",
    highway: "NH-160",
    location: "Nashik, Maharashtra",
    dcFast: 3,
    ac: 10,
    freeCount: 8,
    totalCount: 13,
    waitTime: "No wait",
    pricePerKwh: 20,
    status: "available",
    mapX: 362,
    mapY: 575,
    mapLabel: "8/13",
  },
  {
    id: "chargezone-pune",
    name: "ChargeZone Mega Hub \u2013 Pune",
    highway: "NH-48",
    location: "Pune, Maharashtra",
    dcFast: 8,
    ac: 12,
    freeCount: 11,
    totalCount: 20,
    waitTime: "No wait",
    pricePerKwh: 19,
    status: "available",
    mapX: 490,
    mapY: 685,
    mapLabel: "11/20",
  },
  {
    id: "statiq-kotputli",
    name: "Statiq \u2013 Jaipur Expressway",
    highway: "NH-48",
    location: "Kotputli, Rajasthan",
    dcFast: 2,
    ac: 6,
    freeCount: 0,
    totalCount: 8,
    waitTime: "~60 min",
    pricePerKwh: 15,
    status: "unavailable",
    mapX: 213,
    mapY: 322,
    mapLabel: "0/8",
  },
  {
    id: "adani-ahmedabad",
    name: "Adani TotalEnergies \u2013 Ahmedabad",
    highway: "NH-47",
    location: "Ahmedabad, Gujarat",
    dcFast: 10,
    ac: 10,
    freeCount: 7,
    totalCount: 20,
    waitTime: "~5 min",
    pricePerKwh: 17,
    status: "available",
    mapX: 610,
    mapY: 271,
    mapLabel: "7/20",
  },
];

const BoltIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M13 2L4 14H11L10 22L20 9H13L13 2Z" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const AcPlugIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="9" width="14" height="10" rx="2" stroke="#475569" strokeWidth="1.6" />
    <path d="M9 9V5M15 9V5" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#7c8aa0" strokeWidth="1.8" />
    <path d="M12 7V12L15.5 14" stroke="#7c8aa0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EVHub: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<StationFilter>("All Stations");
  const [activeHighways, setActiveHighways] = useState<Set<string>>(new Set());
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

  const toggleHighway = (highway: string) => {
    setActiveHighways((prev) => {
      const next = new Set(prev);
      if (next.has(highway)) {
        next.delete(highway);
      } else {
        next.add(highway);
      }
      return next;
    });
  };

  const filteredStations = useMemo(() => {
    return STATIONS.filter((station) => {
      if (activeFilter === "Available Now" && station.status !== "available") return false;
      if (activeFilter === "DC Fast Charge" && station.dcFast <= 0) return false;
      if (activeHighways.size > 0 && !activeHighways.has(station.highway)) return false;
      return true;
    });
  }, [activeFilter, activeHighways]);

  const visibleIds = useMemo(() => new Set(filteredStations.map((s) => s.id)), [filteredStations]);

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans">
      <header className="bg-[#163157] px-4 sm:px-10 py-6">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-white text-2xl sm:text-[28px] font-extrabold m-0">
            EV Charging Hubs
          </h1>
          <p className="text-blue-200 text-[15px] mt-1.5">
            Real-time availability along National Highways
          </p>
        </div>
      </header>

      <div className="bg-white px-4 sm:px-10 py-4 shadow-[0_2px_8px_rgba(15,30,60,0.04)]">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600">
            <BoltIcon className="stroke-green-500" />
            Filter:
          </span>

          {STATION_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? "bg-green-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter}
              </button>
            );
          })}

          <div className="flex items-center gap-2 ml-auto">
            {HIGHWAYS.map((highway) => {
              const isActive = activeHighways.has(highway);
              return (
                <button
                  key={highway}
                  type="button"
                  onClick={() => toggleHighway(highway)}
                  className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-blue-50 border-blue-100 text-blue-700 hover:border-blue-300"
                  }`}
                >
                  {highway}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5">
          {/* Map panel */}
          <div className="relative bg-gradient-to-br from-green-50 via-slate-50 to-blue-50 rounded-2xl overflow-hidden min-h-[520px] border border-slate-100">
            <svg viewBox="0 0 950 730" className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
              {/* Region labels */}
              <text x="40" y="290" fill="#94a3b8" fontSize="13" fontWeight="600" letterSpacing="1">
                RAJASTHAN
              </text>
              <text x="778" y="290" fill="#94a3b8" fontSize="13" fontWeight="600" letterSpacing="1">
                GUJARAT
              </text>

              {/* Highway lines */}
              <line x1="70" y1="365" x2="905" y2="345" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 6" />
              <text x="175" y="450" fill="#64748b" fontSize="13" fontWeight="600">
                NH-48
              </text>

              <line x1="80" y1="640" x2="900" y2="530" stroke="#f0b429" strokeWidth="2" strokeDasharray="8 6" />
              <text x="500" y="552" fill="#c98a12" fontSize="13" fontWeight="600">
                NH-160
              </text>

              <line x1="65" y1="365" x2="700" y2="730" stroke="#4ade80" strokeWidth="2" strokeDasharray="8 6" />
              <text x="270" y="642" fill="#16a34a" fontSize="13" fontWeight="600">
                NH-47
              </text>

              {/* Station pins */}
              {STATIONS.map((station) => {
                const isVisible = visibleIds.has(station.id);
                const isSelected = selectedStationId === station.id;
                const color = station.status === "available" ? "#16a34a" : "#ef4444";
                const bg = station.status === "available" ? "#f0fdf4" : "#fef2f2";

                return (
                  <g
                    key={station.id}
                    opacity={isVisible ? 1 : 0.25}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedStationId(station.id)}
                  >
                    <circle cx={station.mapX} cy={station.mapY} r={isSelected ? 7 : 5.5} fill={color} />
                    <rect
                      x={station.mapX - 34}
                      y={station.mapY - 42}
                      width="68"
                      height="26"
                      rx="13"
                      fill={bg}
                      stroke={color}
                      strokeWidth="1.5"
                    />
                    <text
                      x={station.mapX}
                      y={station.mapY - 24}
                      fill={color}
                      fontSize="13"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      &#9889; {station.mapLabel}
                    </text>
                    <text
                      x={station.mapX}
                      y={station.mapY + 20}
                      fill="#334155"
                      fontSize="12"
                      fontWeight="500"
                      textAnchor="middle"
                    >
                      {station.location.split(",")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Station list panel */}
          <div className="flex flex-col gap-4 max-h-[720px] overflow-y-auto pr-1">
            {filteredStations.map((station) => (
              <button
                key={station.id}
                type="button"
                onClick={() => setSelectedStationId(station.id)}
                className={`text-left bg-white rounded-2xl p-5 shadow-[0_8px_24px_rgba(15,30,60,0.06)] border transition-colors cursor-pointer ${
                  selectedStationId === station.id ? "border-green-400" : "border-transparent hover:border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-bold text-slate-800 m-0 leading-snug">
                    {station.name}
                  </h3>
                  <span className="shrink-0 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                    {station.freeCount} free
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1 mb-3">
                  {station.highway} &middot; {station.location}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold">
                    <BoltIcon className="fill-green-500 stroke-green-500" />
                    DC {station.dcFast}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                    <AcPlugIcon />
                    AC {station.ac}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <ClockIcon />
                    {station.waitTime}
                  </span>
                </div>

                <div className="flex justify-end mt-2">
                  <span className="text-sm font-bold text-slate-800">
                    &#8377;{station.pricePerKwh}/kWh
                  </span>
                </div>
              </button>
            ))}

            {filteredStations.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-sm shadow-[0_8px_24px_rgba(15,30,60,0.06)]">
                No stations match the selected filters.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EVHub;