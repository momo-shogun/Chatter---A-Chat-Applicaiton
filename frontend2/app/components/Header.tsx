import { Copy, CopyCheck } from "lucide-react"
import { useState } from "react"

export const Header = ({ room }: { room: string }) => {
  const [copySuccess, setCopySuccess] = useState(false)
  const copyText = () => {
    navigator.clipboard.writeText(room)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 1500)
  }
  return (
    <header>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between py-4 border-b md:flex">
          <div>
            <h3 className="text-[#9e2a2b] drop-shadow-md text-2xl font-bold">
              CHATTER
            </h3>
          </div>
          <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
            {room ? (
              <button
                onClick={copyText}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-[#9e2a2b] font-medium bg-[#fff3b0]/70 rounded-lg md:text-sm hover:text-[#9e2a2b]/80 hover:shadow-md transition ease-in-out duration-150"
              >
                Room Id: {room}
                <span className={`transition-transform duration-500 ${copySuccess ? 'transform scale-125 text-green-500' : ''}`}>
                  {copySuccess ? <CopyCheck size={18} /> : <Copy size={18} />}
                </span>
              </button>
            ) : (
              <a
                href="/"
                className="block px-4 py-2 text-center text-[#9e2a2b] duration-150 font-medium bg-[#fff3b0]/70 rounded-lg hover:bg-[#fff3b0]  md:text-sm"
              >
                Join Room
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
