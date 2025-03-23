

export default function WhiteBlueTicket({ qrCode }:{
    qrCode : string
}) {
  const ticketNo = 12345; // Example ticket number

  return (
    <div className="w-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex">
        {/* Left Panel (Blue Background, White Text) */}
        <div className="bg-[#18181B] text-white w-4/5 pt-8 pb-4 px-12 rounded-l-lg">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4">
            {/* QR Code instead of logo */}
            <div className="flex items-center">
              <img
                src={qrCode}
                className="w-20 h-20 object-contain rounded border border-white"
              />
            </div>
            <span className="text-sm">
              An AI launch event <strong>accelerate.builder.io</strong>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl mb-2">Accelerate &gt;&gt;&gt;</h1>

          {/* Date & Time */}
          <div className="flex items-center mb-4">
            <span className="text-lg">March 13, 2024</span>
            <span className="mx-3 text-lg">/</span>
            <span className="text-lg">10 AM PST</span>
          </div>
          
        </div>

        {/* Right Panel (White Background, Blue Text) */}
        <div className="bg-white text-blue-700 py-8 px-4 text-center border-l-8 border-dashed border-[#18181B]">
          <div className="text-sm mb-1">Id No.</div>
          <div className="inline-block text-2xl font-semibold border-l-4 border-[#18181B] pl-2">
            #{ticketNo}
          </div>
        </div>
      </div>
    </div>
  );
}
