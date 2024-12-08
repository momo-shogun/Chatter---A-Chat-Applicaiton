import { Send } from "lucide-react";
import SystemChat from "./components/SystemChat";
import UserChat from "./components/UserChat";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userChats, setUserChats] = useState<string[]>([]);
  const [systemChat, setSystemChat] = useState<string[]>([]);

  const [socket, setSocket] = useState<WebSocket>();

  function sentMessage() {
    if (!socket) return;
    const inputValue: any = inputRef.current?.value;
    setUserChats((prev) => [...prev, inputValue]);
    //@ts-ignore
    socket.send(inputValue);
    if (inputRef.current) inputRef.current.value = "";
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (ev) => {
      setSystemChat((prevValues) => [...prevValues, ev.data]);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center h-screen items-center bg-red bg-gradient-to-r from-red-500 to-black">
        <div className="rounded-lg shadow-sm px-4 pb-4 ">
          <div className="font-md text-red-500 drop-shadow-md font-bold ">
            CHATTER
          </div>
          <div>
            <SystemChat data={systemChat}></SystemChat>
            <UserChat data={userChats}></UserChat>
          </div>
          <div className="flex mt-4 gap-2">
            <input
              type="text"
              className="flex h-10 w-full rounded-md border  px-3 py-2 text-xs  focus-visible:outline-none focus-visible focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
              placeholder="Sent a message"
              ref={inputRef}
            />
            <div className="bg-black p-2 text-white rounded-md flex justify-center items-center hover:bg-black/70">
              <Send size={18} onClick={sentMessage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
