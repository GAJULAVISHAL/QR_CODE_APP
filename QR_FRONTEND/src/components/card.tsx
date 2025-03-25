import { pass } from "../hooks";

export default function WhiteBlueTicket({ pass }: {
  pass: pass
}) {

  return (
    <div className="max-w-[700px] w-full bg-white shadow-xl shadow-blue-100 rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Panel (Dark Background, White Text) */}
        <div className="bg-[#18181B] text-white md:w-3/4 w-full pt-8 pb-4 px-12 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm">
              Ticket for: <strong className="text-base text-white">{pass.personName}</strong>
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{pass.eventName}</h1>
          <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Event On:</span>
              <span className="text-lg">{pass.eventDate}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Price:</span>
              <span className="text-lg">₹ {pass.price}</span>
            </div>
          </div>
        </div>

        {/* Right Panel (White Background, Blue Text) */}
        <div className="bg-white text-blue-700 py-8 px-4 text-center border-t-8 md:border-l-8 md:border-t-0 border-dashed border-[#18181B] md:w-1/4 w-full flex flex-col justify-center">
          <div className="mb-2 font-semibold">QR Code</div>
          <div className="flex items-center justify-center">
            <img
              src={pass.qrCodeUrl}
              alt="QR Code"
              className="w-24 h-24 object-contain rounded border border-blue-700"
            />
          </div>
        </div>
      </div>
    </div>

  );
}
