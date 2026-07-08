import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BUS_RESULTS, type BusResult } from "../data/buses";

type FilterOption =
  | "Sleeper"
  | "Semi-Sleeper"
  | "Seater"
  | "AC"
  | "Non-AC"
  | "RTC"
  | "Private";

type SortOption = "Departure" | "Price" | "Rating";

const FILTER_OPTIONS: FilterOption[] = [
  "Sleeper",
  "Semi-Sleeper",
  "Seater",
  "AC",
  "Non-AC",
  "RTC",
  "Private",
];

const SORT_OPTIONS: SortOption[] = ["Departure", "Price", "Rating"];

const FilterIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 5H20L14 12.5V19L10 21V12.5L4 5Z"
      stroke="#163157"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 9L12 15L18 9"
      stroke="#163157"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#7c8aa0" strokeWidth="1.8" />
    <path d="M12 11V16" stroke="#7c8aa0" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1" fill="#7c8aa0" />
  </svg>
);

const BusStopIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="11" rx="2" stroke="#94a3b8" strokeWidth="1.8" />
    <path d="M3 11.5H21" stroke="#94a3b8" strokeWidth="1.8" />
    <circle cx="7.5" cy="19" r="1.2" fill="#94a3b8" />
    <circle cx="16.5" cy="19" r="1.2" fill="#94a3b8" />
  </svg>
);

const SeatIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="10" rx="2" stroke="#475569" strokeWidth="1.8" />
    <path d="M4 14V19M20 14V19" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const AcIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3V21M4.5 6.5L19.5 17.5M19.5 6.5L4.5 17.5"
      stroke="#16a34a"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const StarIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.9 8.6L22 9.3L16.7 13.9L18.3 21L12 17.3L5.7 21L7.3 13.9L2 9.3L9.1 8.6L12 2Z" />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="#4ade80"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const amenityIcon = (label: string): React.ReactNode => {
  if (label.toLowerCase().includes("ac")) return <AcIcon />;
  return <SeatIcon />;
};

interface BusesProps {
  from?: string;
  to?: string;
  date?: string;
  travelers?: number;
}

const Buses: React.FC<BusesProps> = ({
  from = "Delhi",
  to = "Jaipur",
  date = "Jan 15",
  travelers = 1,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<Set<FilterOption>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>("Departure");

  const routeFrom = searchParams.get("from") ?? from;
  const routeTo = searchParams.get("to") ?? to;
  const routeDate = searchParams.get("date") ?? date;
  const routeTravelers = Number(searchParams.get("travelers") ?? `${travelers}`) || travelers;

  const toggleFilter = (filter: FilterOption) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  const averageFare = useMemo(() => {
    const total = BUS_RESULTS.reduce((sum, bus) => sum + bus.pricePerSeat, 0);
    return Math.round(total / BUS_RESULTS.length);
  }, []);

  const sortedResults = useMemo(() => {
    const results = [...BUS_RESULTS];
    if (sortBy === "Price") {
      results.sort((a, b) => a.pricePerSeat - b.pricePerSeat);
    } else if (sortBy === "Rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      results.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }
    return results;
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans">
      <header className="bg-[#163157] px-4 sm:px-10 py-4">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="flex items-center gap-2.5 text-white text-xl font-bold m-0">
              {routeFrom}
              <ArrowRightIcon />
              {routeTo}
            </h1>
            <span className="text-slate-300 text-[15px]">
              {routeDate} &middot; {routeTravelers} traveler{routeTravelers > 1 ? "s" : ""}
            </span>
          </div>
          <span className="text-slate-300 text-[15px]">
            {sortedResults.length} buses found
          </span>
        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-4 sm:px-10 py-6">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_8px_24px_rgba(15,30,60,0.06)] flex items-center gap-3 flex-wrap">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-[#163157] font-semibold text-sm pr-3 border-r border-slate-200 cursor-pointer"
          >
            <FilterIcon />
            Filters
            <ChevronDownIcon />
          </button>

          <div className="flex items-center gap-2 flex-wrap flex-1">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilters.has(filter);
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => toggleFilter(filter)}
                  className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#163157] border-[#163157] text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-[#163157]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-400">Sort:</span>
            {SORT_OPTIONS.map((option) => {
              const isActive = sortBy === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSortBy(option)}
                  className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#163157] text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5 mb-5 text-sm text-slate-500">
          <InfoIcon />
          Average fare on this route:
          <span className="font-bold text-slate-800">&#8377;{averageFare}</span>
        </div>

        <div className="flex flex-col gap-5">
          {sortedResults.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_8px_24px_rgba(15,30,60,0.06)]"
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-800 m-0">{bus.operator}</h2>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                      {bus.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{bus.busModel}</p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-extrabold text-slate-800 m-0">
                    &#8377;{bus.pricePerSeat}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">per seat</p>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 mt-6">
                <div>
                  <p className="text-xl font-extrabold text-slate-800 m-0">
                    {bus.departureTime}
                  </p>
                  <p className="text-sm text-slate-400 mt-0.5">{bus.departureCity}</p>
                </div>

                <div className="relative flex flex-col items-center">
                  <span className="text-xs text-slate-400 mb-1">{bus.duration}</span>
                  <div className="w-full flex items-center gap-2">
                    <div className="flex-1 h-px bg-slate-200" />
                    <BusStopIcon />
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>
                  <span className="text-xs text-slate-400 mt-1">{bus.stopType}</span>
                </div>

                <div className="text-right">
                  <p className="text-xl font-extrabold text-slate-800 m-0">
                    {bus.arrivalTime}
                  </p>
                  <p className="text-sm text-slate-400 mt-0.5">{bus.arrivalCity}</p>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 flex-wrap">
                  {bus.amenities.map((amenity, index) => (
                    <span
                      key={`${bus.id}-${amenity}-${index}`}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
                        amenity.toLowerCase() === "ac"
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {amenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <p className="inline-flex items-center gap-1 text-sm font-bold text-slate-800 m-0">
                      <StarIcon />
                      {bus.rating.toFixed(1)}
                    </p>
                    <p className="text-xs text-green-600 font-semibold mt-0.5">
                      {bus.seatsLeft} seats left
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/booking/${bus.id}?from=${encodeURIComponent(routeFrom)}&to=${encodeURIComponent(routeTo)}&date=${encodeURIComponent(routeDate)}&travelers=${routeTravelers}`,
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-6 py-3 rounded-[10px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Buses;