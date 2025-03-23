export const SinglePass = () => {
    return (

        <div
            className="max-w-md border-2 border-primary rounded overflow-hidden shadow"
        >
            {/* Header */}
            <div className="bg-primary text-white p-4">
                <h2 className="text-xl font-bold text-center">
                    Event Name
                </h2>
            </div>

            {/* Main Content */}
            <div className="p-6 flex">
                {/* Left Section */}
                <div className="flex-1 space-y-4">
                    {/* Attendee */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>👤</span>
                            <span>Attendee</span>
                        </div>
                        <p className="font-medium">
                            Attendee Name
                        </p>
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>📅</span>
                            <span>Date</span>
                        </div>
                        <p className="font-medium">
                            Event Date
                        </p>
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>📍</span>
                            <span>Location</span>
                        </div>
                        <p className="font-medium">
                            Event Location
                        </p>
                    </div>

                    {/* Ticket Type */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>🎟️</span>
                            <span>Ticket Type</span>
                        </div>
                        <p className="font-medium">
                            Standard
                        </p>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="border-l border-gray-300 mx-4" />

                {/* Right Section (QR Code) */}
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-white p-2 rounded">
                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-600">
                            <img src="data:image/gif;base64,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" />
                        </div>
                    </div>
                    <p className="text-xs mt-2 text-gray-500">
                        User ID: N/A
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 p-3 text-center text-xs text-gray-500">
                Scan QR code for entry • Not transferable • ID may be required
            </div>
        </div>

    )
}