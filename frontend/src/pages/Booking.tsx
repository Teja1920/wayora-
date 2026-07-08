import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getBusById } from "../data/buses";

type BookingStep = "seats" | "payment" | "confirmed";
type SeatStatus = "available" | "booked" | "ladies";
type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";

interface Seat {
  label: string;
  status: SeatStatus;
}

const buildSeats = (): Seat[] => {
  const blocked = new Set(["1A", "1B", "2A", "3B", "4A", "4B", "6A", "7B", "8A"]);
  const ladies = new Set(["2B", "5A"]);
  const seats: Seat[] = [];

  for (let row = 1; row <= 10; row += 1) {
    for (const column of ["A", "B", "C", "D"]) {
      const label = `${row}${column}`;
      seats.push({
        label,
        status: blocked.has(label) ? "booked" : ladies.has(label) ? "ladies" : "available",
      });
    }
  }

  return seats;
};

const SEATS = buildSeats();

const PAYMENT_METHODS: { id: PaymentMethod; label: string; sublabel: string }[] = [
  { id: "upi", label: "UPI", sublabel: "PhonePe, GPay" },
  { id: "card", label: "Card", sublabel: "Debit / Credit" },
  { id: "netbanking", label: "Net Banking", sublabel: "All banks" },
  { id: "wallet", label: "Wallet", sublabel: "Paytm, Mobikwik" },
];

const UPI_APPS = ["PhonePe", "Google Pay", "Paytm", "BHIM"];

const formatDateLabel = (value: string) => {
  if (!value) {
    return "Jan 15, 2025";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const SeatIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 14V19M20 14V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ShieldIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="m9.5 12.5 1.8 1.8 3.8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.8" />
    <path d="m8.5 12.2 2.4 2.4 4.8-5" stroke="#22c55e" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Field: React.FC<{ value: string; placeholder: string; onChange: (value: string) => void }> = ({
  value,
  placeholder,
  onChange,
}) => (
  <input
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] outline-none focus:border-[#163157]"
  />
);

const Legend: React.FC<{ label: string; tone: "available" | "selected" | "booked" | "ladies" }> = ({
  label,
  tone,
}) => {
  const toneClass =
    tone === "available"
      ? "bg-emerald-50 border-emerald-200 text-emerald-500"
      : tone === "selected"
        ? "bg-[#163157] border-[#163157] text-white"
        : tone === "booked"
          ? "bg-slate-100 border-slate-200 text-slate-400"
          : "bg-rose-50 border-rose-200 text-rose-400";

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-7 h-5 rounded-md border ${toneClass}`} />
      {label}
    </span>
  );
};

const LineItem: React.FC<{ label: string; value: React.ReactNode; tone?: "positive" }> = ({
  label,
  value,
  tone,
}) => (
  <div className="flex items-center justify-between gap-4">
    <span className={tone === "positive" ? "text-green-600" : "text-slate-500"}>{label}</span>
    <span className={tone === "positive" ? "text-green-600 font-semibold" : "font-semibold text-slate-800"}>
      {value}
    </span>
  </div>
);

const seatClassName = (status: SeatStatus, isSelected: boolean) => {
  if (isSelected) {
    return "bg-[#163157] border-[#163157] text-white shadow-[0_10px_18px_rgba(22,49,87,0.18)]";
  }

  if (status === "booked") {
    return "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed";
  }

  if (status === "ladies") {
    return "bg-rose-50 border-rose-300 text-rose-500 hover:border-rose-400";
  }

  return "bg-white border-emerald-300 text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50";
};

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [searchParams] = useSearchParams();

  const bus = useMemo(() => getBusById(busId), [busId]);
  const from = searchParams.get("from") ?? bus.departureCity;
  const to = searchParams.get("to") ?? bus.arrivalCity;
  const date = searchParams.get("date") ?? "2025-01-15";
  const travelers = Math.max(1, Number(searchParams.get("travelers") ?? "1") || 1);

  const [step, setStep] = useState<BookingStep>("seats");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [passenger, setPassenger] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });

  const selectedSeatSet = useMemo(() => new Set(selectedSeats), [selectedSeats]);
  const bookingTotals = useMemo(() => {
    const count = selectedSeats.length;
    const baseFare = count * bus.pricePerSeat;
    const convenienceFee = 49;
    const gst = Math.round(baseFare * 0.05);
    const total = baseFare + convenienceFee + gst;

    return { baseFare, convenienceFee, gst, total };
  }, [bus.pricePerSeat, selectedSeats.length]);

  const bookingTotal = bookingTotals.total || bus.pricePerSeat + 49 + Math.round(bus.pricePerSeat * 0.05);

  const toggleSeat = (label: string, status: SeatStatus) => {
    if (status !== "available") {
      return;
    }

    setSelectedSeats((current) => {
      if (current.includes(label)) {
        return current.filter((seat) => seat !== label);
      }

      if (current.length >= travelers) {
        return current;
      }

      return [...current, label];
    });
  };

  const handleProceedToPay = () => {
    if (!selectedSeats.length) {
      return;
    }

    setStep("payment");
  };

  const handlePay = () => {
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-[#f4f6f9] px-4 sm:px-10 py-10">
        <div className="max-w-[560px] mx-auto bg-white rounded-[28px] shadow-[0_20px_60px_rgba(15,30,60,0.14)] p-6 sm:p-10 border border-emerald-100 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckIcon />
          </div>

          <h1 className="mt-6 text-3xl sm:text-[34px] font-extrabold text-slate-800">Booking Confirmed!</h1>
          <p className="mt-2 text-slate-500 text-[15px]">Your e-ticket has been sent to your email & SMS</p>

          <div className="mt-8 bg-slate-50 rounded-3xl p-5 text-left">
            <div className="grid grid-cols-[1fr_auto] gap-y-3 text-[15px]">
              <span className="text-slate-500">PNR</span>
              <span className="font-semibold text-slate-800">BG30373617</span>
              <span className="text-slate-500">Route</span>
              <span className="font-semibold text-slate-800">{from} → {to}</span>
              <span className="text-slate-500">Seats</span>
              <span className="font-semibold text-slate-800">{selectedSeats.join(", ") || "No seats selected"}</span>
              <span className="text-slate-500">Departure</span>
              <span className="font-semibold text-slate-800">{bus.departureTime} · {formatDateLabel(date)}</span>
            </div>

            <div className="border-t border-slate-200 mt-4 pt-4 flex items-center justify-between">
              <span className="font-bold text-slate-800">Total Paid</span>
              <span className="font-extrabold text-green-600">&#8377;{bookingTotal}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate("/buses")}
              className="flex-1 rounded-2xl border-2 border-[#163157] text-[#163157] font-bold py-3.5 hover:bg-slate-50 transition-colors"
            >
              Download Ticket
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 rounded-2xl bg-green-500 text-white font-bold py-3.5 hover:bg-green-600 transition-colors"
            >
              View Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] px-4 sm:px-10 py-8">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 xl:grid-cols-[1.45fr_0.85fr] gap-6">
        <div className="space-y-6">
          {step === "seats" ? (
            <section className="bg-white rounded-[28px] shadow-[0_14px_40px_rgba(15,30,60,0.08)] border border-slate-200 p-5 sm:p-7">
              <h1 className="text-2xl sm:text-[30px] font-extrabold text-slate-800">Select Your Seats</h1>

              <div className="flex flex-wrap gap-4 mt-5 text-sm text-slate-500">
                <Legend label="Available" tone="available" />
                <Legend label="Selected" tone="selected" />
                <Legend label="Booked" tone="booked" />
                <Legend label="Ladies" tone="ladies" />
              </div>

              <div className="mt-6 rounded-[28px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-8 min-h-[560px] relative overflow-hidden">
                <div className="absolute right-5 top-5 rounded-2xl bg-slate-200 text-slate-500 font-semibold text-xs px-5 py-4">
                  DRV
                </div>

                <div className="flex items-center gap-5 mt-10 sm:mt-14">
                  <div className="flex flex-col gap-5 text-slate-400 text-sm font-medium">
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((row) => (
                      <span key={row} className="h-10 flex items-center justify-center">
                        {row}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-[repeat(4,auto)] gap-2.5 sm:gap-3 items-center">
                    {SEATS.map((seat) => {
                      const isSelected = selectedSeatSet.has(seat.label);
                      const isDisabled = seat.status !== "available";

                      return (
                        <button
                          key={seat.label}
                          type="button"
                          onClick={() => toggleSeat(seat.label, seat.status)}
                          className={`w-14 h-10 sm:w-[56px] sm:h-[38px] rounded-[12px] border-2 text-xs sm:text-sm font-bold transition-all ${seatClassName(
                            seat.status,
                            isSelected,
                          )}`}
                          disabled={isDisabled}
                          aria-pressed={isSelected}
                        >
                          {seat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {step === "payment" ? (
            <>
              <section className="bg-white rounded-[28px] shadow-[0_14px_40px_rgba(15,30,60,0.08)] border border-slate-200 p-5 sm:p-7">
                <h2 className="text-2xl sm:text-[30px] font-extrabold text-slate-800">Choose Payment Method</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-5">
                  {PAYMENT_METHODS.map((method) => {
                    const active = paymentMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`rounded-2xl border-2 p-4 text-center transition-colors ${
                          active ? "border-[#163157] bg-[#eff4ff]" : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="w-10 h-10 mx-auto rounded-xl bg-slate-50 flex items-center justify-center text-[#163157] font-bold">
                          {method.label.slice(0, 1)}
                        </div>
                        <p className="mt-3 font-semibold text-slate-800">{method.label}</p>
                        <p className="text-sm text-slate-400">{method.sublabel}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {UPI_APPS.map((app) => (
                    <button
                      key={app}
                      type="button"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-[#163157]"
                    >
                      {app}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-col lg:flex-row gap-3">
                  <input
                    value={upiId}
                    onChange={(event) => setUpiId(event.target.value)}
                    placeholder="Enter UPI ID (e.g. name@upi)"
                    className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] outline-none focus:border-[#163157]"
                  />
                  <button type="button" className="rounded-2xl bg-[#163157] px-6 py-3 font-bold text-white hover:bg-[#214472]">
                    Verify
                  </button>
                </div>
              </section>

              <section className="bg-white rounded-[28px] shadow-[0_14px_40px_rgba(15,30,60,0.08)] border border-slate-200 p-5 sm:p-7">
                <h2 className="text-2xl sm:text-[30px] font-extrabold text-slate-800">Passenger Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  <Field value={passenger.firstName} placeholder="First Name" onChange={(value) => setPassenger((current) => ({ ...current, firstName: value }))} />
                  <Field value={passenger.lastName} placeholder="Last Name" onChange={(value) => setPassenger((current) => ({ ...current, lastName: value }))} />
                  <Field value={passenger.mobile} placeholder="Mobile Number" onChange={(value) => setPassenger((current) => ({ ...current, mobile: value }))} />
                  <Field value={passenger.email} placeholder="Email Address" onChange={(value) => setPassenger((current) => ({ ...current, email: value }))} />
                </div>
              </section>
            </>
          ) : null}
        </div>

        <aside className="space-y-6">
          <section className="bg-white rounded-[28px] shadow-[0_14px_40px_rgba(15,30,60,0.08)] border border-slate-200 p-5 sm:p-7 sticky top-6">
            <h2 className="text-2xl font-extrabold text-slate-800">Booking Summary</h2>

            <div className="mt-5 rounded-[22px] bg-slate-50 p-4">
              <p className="text-[15px] font-semibold text-slate-800">{bus.operator}</p>
              <p className="text-sm text-slate-500 mt-1">
                {from} → {to} · {formatDateLabel(date)} · {bus.departureTime}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSeats.slice(0, travelers).map((seat) => (
                  <span key={seat} className="rounded-full bg-[#163157] px-3 py-1 text-sm font-bold text-white">
                    {seat}
                  </span>
                ))}
                {!selectedSeats.length ? (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-600">
                    No seats selected
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-5 space-y-3 text-[15px]">
              <LineItem label={`Base fare x ${selectedSeats.length || 1}`} value={`&#8377;${bookingTotals.baseFare || bus.pricePerSeat}`} />
              <LineItem label="Convenience fee" value={`&#8377;${bookingTotals.convenienceFee}`} />
              <LineItem label="GST (5%)" value={`&#8377;${bookingTotals.gst}`} />
              <LineItem label="Green travel offset" value="Included" tone="positive" />
            </div>

            <div className="border-t border-slate-200 mt-5 pt-4 flex items-center justify-between">
              <span className="text-lg font-extrabold text-slate-800">Total Amount</span>
              <span className="text-[28px] font-extrabold text-[#163157]">&#8377;{bookingTotal}</span>
            </div>

            {step === "seats" ? (
              <button
                type="button"
                onClick={handleProceedToPay}
                disabled={!selectedSeats.length}
                className={`mt-5 w-full rounded-2xl py-4 text-[18px] font-bold text-white transition-colors ${
                  selectedSeats.length ? "bg-green-500 hover:bg-green-600" : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                {selectedSeats.length ? `Proceed to Pay - &#8377;${bookingTotal}` : "Select seats to continue"}
              </button>
            ) : null}

            {step === "payment" ? (
              <button
                type="button"
                onClick={handlePay}
                className="mt-5 w-full rounded-2xl py-4 text-[18px] font-bold text-white bg-green-500 hover:bg-green-600 transition-colors"
              >
                Pay &#8377;{bookingTotal} Securely
              </button>
            ) : null}

            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400">
              <ShieldIcon /> Secure & encrypted checkout
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Booking;