import { useParams } from "react-router-dom"
import { usePass } from "../hooks"
import WhiteBlueTicket from "./card"

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
    animation: shimmer 2.5s infinite ease-in-out;
  }
`;
document.head.appendChild(style);

export const Pass = () => {
    const { id } = useParams()
    const { loading, pass } = usePass({ id: id || "" })
    console.log(pass)
    if (loading || !pass) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex justify-center items-center h-64 w-full p-4">
                    <div
                        className={`
                            relative
                            w-full max-w-4xl h-60
                            border border-gray-300 
                            rounded-lg 
                            overflow-hidden 
                            shadow-sm
                            ${loading ? 'bg-gray-50' : 'bg-white'}
                        `}>
                        {loading && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="h-full w-1/4 bg-gray-300 opacity-40 animate-shimmer" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <WhiteBlueTicket pass={pass} />
        </div>

    )
}