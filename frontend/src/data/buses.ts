export interface BusResult {
  id: string;
  operator: string;
  badge: string;
  busModel: string;
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  duration: string;
  stopType: "Direct" | "1 Stop" | "2+ Stops";
  amenities: string[];
  rating: number;
  seatsLeft: number;
  pricePerSeat: number;
}

export const BUS_RESULTS: BusResult[] = [
  {
    id: "msrtc-shivneri",
    operator: "MSRTC Shivneri",
    badge: "RTC",
    busModel: "Volvo 9400",
    departureTime: "06:00",
    departureCity: "Delhi",
    arrivalTime: "12:30",
    arrivalCity: "Jaipur",
    duration: "6h 30m",
    stopType: "Direct",
    amenities: ["Seater", "AC", "AC"],
    rating: 4.2,
    seatsLeft: 35,
    pricePerSeat: 650,
  },
  {
    id: "gsrtc-express",
    operator: "GSRTC Express",
    badge: "RTC",
    busModel: "Ashok Leyland Viking",
    departureTime: "07:30",
    departureCity: "Delhi",
    arrivalTime: "15:00",
    arrivalCity: "Jaipur",
    duration: "7h 30m",
    stopType: "Direct",
    amenities: ["Seater", "AC"],
    rating: 4.0,
    seatsLeft: 22,
    pricePerSeat: 480,
  },
  {
    id: "rajasthan-royal",
    operator: "Rajasthan Royal Travels",
    badge: "Private",
    busModel: "Volvo Multi-Axle",
    departureTime: "21:00",
    departureCity: "Delhi",
    arrivalTime: "03:30",
    arrivalCity: "Jaipur",
    duration: "6h 30m",
    stopType: "Direct",
    amenities: ["Sleeper", "AC", "Blanket"],
    rating: 4.6,
    seatsLeft: 8,
    pricePerSeat: 890,
  },
];

export const getBusById = (busId: string | null | undefined) => {
  if (!busId) {
    return BUS_RESULTS[0];
  }

  return BUS_RESULTS.find((bus) => bus.id === busId) ?? BUS_RESULTS[0];
};