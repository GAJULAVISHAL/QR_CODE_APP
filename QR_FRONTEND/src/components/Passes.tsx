import { Link } from "react-router-dom";
import { usePasses } from "../hooks"
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(400%);
    }
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;
document.head.appendChild(style);

export const Passes = () => {
    const { loading, passes } = usePasses()

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex justify-center items-center h-64 w-full">
                    <div
                        className={`
                                    relative
                                    w-80 h-60 
                                    border border-gray-400 
                                    rounded-md 
                                    overflow-hidden 
                                    shadow-sm
                                    ${loading ? 'bg-gray-200' : 'bg-white'}
                                `}>
                        {loading && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="h-full w-1/3 bg-gray-300 opacity-50 animate-shimmer" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center h-64 w-full">
                    <div
                        className={`
                                    relative
                                    w-80 h-60 
                                    border border-gray-400 
                                    rounded-md 
                                    overflow-hidden 
                                    shadow-sm
                                    ${loading ? 'bg-gray-200' : 'bg-white'}
                                `}>
                        {loading && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="h-full w-1/3 bg-gray-300 opacity-50 animate-shimmer" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center h-64 w-full">
                    <div
                        className={`
                                    relative
                                    w-80 h-60 
                                    border border-gray-400 
                                    rounded-md 
                                    overflow-hidden 
                                    shadow-sm
                                    ${loading ? 'bg-gray-200' : 'bg-white'}
                                `}>
                        {loading && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="h-full w-1/3 bg-gray-300 opacity-50 animate-shimmer" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center h-64 w-full">
                    <div
                        className={`
                                    relative
                                    w-80 h-60 
                                    border border-gray-400 
                                    rounded-md 
                                    overflow-hidden 
                                    shadow-sm
                                    ${loading ? 'bg-gray-200' : 'bg-white'}
                                `}>
                        {loading && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="h-full w-1/3 bg-gray-300 opacity-50 animate-shimmer" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center h-64 w-full">
                    <div
                        className={`
                                    relative
                                    w-80 h-60 
                                    border border-gray-400 
                                    rounded-md 
                                    overflow-hidden 
                                    shadow-sm
                                    ${loading ? 'bg-gray-200' : 'bg-white'}
                                `}>
                        {loading && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="h-full w-1/3 bg-gray-300 opacity-50 animate-shimmer" />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        )
    }

    if ((passes ?? []).length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No passes found</h3>
                <p className="text-gray-500 mb-6">You haven't created any passes yet.</p>
            </div>
        )
    }


    return (
        <div className="min-w-[70%]">
            <h2 className="text-xl font-semibold mb-6">Your Passes</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(passes ?? []).map(pass => (
                    <div
                        key={pass.id}
                        // Replaced w-[120%] with w-full
                        className="border border-gray-200 rounded-md overflow-hidden shadow-sm w-full"
                    >
                        {/* Event Header */}
                        <div className="bg-[#18181B] text-white p-4">
                            <h3 className="font-medium">{pass.eventName}</h3>
                        </div>

                        {/* Pass Details */}
                        <div className="p-4 space-y-2">
                            <div className="space-y-2 mb-4">
                                <p className="text-sm">
                                    <strong>Attendee:</strong> {pass.personName}
                                </p>
                                <p className="text-sm">
                                    <strong>Event on:</strong> {pass.eventDate}
                                </p>
                                <p className="text-sm">
                                    <strong>Price:</strong> {pass.price}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex mt-4 pt-3">
                                <button className="flex-1 flex items-center justify-center py-2 text-sm text-gray-700 border rounded-md mr-2 hover:bg-gray-50"
                                >
                                    <Link to={`/pass/${pass.id}`} className="flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-2"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="16"></line>
                                        <line x1="8" y1="12" x2="16" y2="12"></line>
                                    </svg>
                                        View
                                    </Link>
                                </button>
                                <button className="flex-1 flex items-center justify-center py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-2"
                                    >
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    <a href={pass.qrCodeUrl} download="qrcode.png">Download</a>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}