import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

const Room = ({
  setRoom,
  room,
  joinRoom,
  username,
  setUsername,
}: {
  setRoom: Dispatch<SetStateAction<string>>
  room: string
  joinRoom: (input: string) => void,
  username: string
  setUsername: Dispatch<SetStateAction<string>>
}) => {
  const [input, setInput] = useState<string>("")
  return (
    <>
      <div className="w-1/2 sm:mt-40 mt-20 mx-auto space-y-4">
        <div className="">
          <input
            type="text"
            value={username}
            placeholder="Enter the username"
            className="sm:py-4 py-2 px-4 sm:px-6  w-full rounded-md outline outline-[#fdf0d5] text-[#9e2a2b] border-[#fdf0d5] shadow-sm sm:text-sm focus:outline-none focus:outline-[#fff3b0]"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex  justify-center  gap-2 items-center">
          <input
            type="text"
            value={input}
            placeholder="Enter Room Id"
            className="sm:py-4 py-2 px-4 sm:px-6  w-full rounded-md  outline outline-[#fdf0d5] text-[#9e2a2b] border-gray-200 shadow-sm sm:text-sm focus:outline-none focus:outline-[#fff3b0]"
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className=" rounded-md sm:py-4 py-2 px-4 sm:px-6 bg-[#fff3b0]/70 font-medium text-[#9e2a2b] hover:bg-[#fff3b0]"
            onClick={()=>joinRoom(input)}
          >
            Join
          </button>
        </div>
      </div>
    </>
  )
}

export default Room;
