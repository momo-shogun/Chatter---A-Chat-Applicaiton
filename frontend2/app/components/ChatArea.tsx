"use client"; // Mark this as a client-side component

import { ChangeEvent, useEffect, useState } from "react";
import { Send } from "lucide-react";
import Room from "./Room";

export interface Messages {
  name: string;
  message: string;
}

const ChatArea = () => {
  const [room, setRoom] = useState<string>("");
  const [allChats, setAllChats] = useState<Messages[]>([]);
  const [username, setUsername] = useState<string>("");
  const [currMsg, setCurrMsg] = useState<Messages | undefined>();
  const [socket, setSocket] = useState<WebSocket | undefined>();
  const [message, setMessage] = useState<string>("");
  const [conn, setConn] = useState(false);
  useEffect(() => {
    // Establish WebSocket connection on mount
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (ev) => {
      console.log(ev.data);

      setAllChats((prev) => [...prev, JSON.parse(ev.data)]);
    };
    ws.onerror = (error) => {
      console.log(error);
    };
    return () => {
      // Cleanup WebSocket connection on unmount
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (!socket || !message) return;
    const newMessage = { name: username, message };
    setAllChats((prev) => [...prev, newMessage]);
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: newMessage,
        },
      })
    );
    setMessage("");
  };

  const joinRoom = () => {
    if (!username || !socket || !room)
      return console.error("Missing username, socket, or room details");
    console.log(`Joining room: ${room} as ${username}`);

    socket.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId: room,
        },
      })
    );
    setConn(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {!conn ? (
        <Room
          setRoom={setRoom}
          room={room}
          joinRoom={joinRoom}
          username={username}
          setUsername={setUsername}
        />
      ) : (
        <div className="chat-area">
          <div className="chat-messages">
            {allChats.map((chat, index) => (
              <div key={index}>
                <strong>{chat.name}: </strong>
                <span>{chat.message}</span>
              </div>
            ))}
          </div>
          <div className="fixed bottom-0 w-4/5  border-t mb-4">
            <div className="flex mt-4 gap-2">
              <input
                type="text"
                className="flex h-10 w-full rounded-md border px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Send a message"
                onChange={handleInputChange}
                value={message}
              />
              <div
                className="bg-[#ef4444] p-2 text-white rounded-md flex justify-center items-center hover:bg-[#ef4444]/90"
                onClick={sendMessage}
              >
                <Send />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
