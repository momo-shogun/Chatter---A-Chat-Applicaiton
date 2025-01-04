"use client" // Mark this as a client-side component

import { ChangeEvent, useEffect, useState } from "react"
import { Send } from "lucide-react"
import Room from "./Room"
import { Header } from "./Header"

export interface Messages {
  name: string
  message: string
}

const ChatArea = () => {
  const [room, setRoom] = useState<string>("")
  const [allChats, setAllChats] = useState<Messages[]>([
    { name: "123", message: "Welcome to the chat!" },
    {
      name: "Admin",
      message: "Please enter your username and room ID to join the chat.",
    },
  ])
  const [username, setUsername] = useState<string>("")
  const [currMsg, setCurrMsg] = useState<Messages | undefined>()
  const [socket, setSocket] = useState<WebSocket | undefined>()
  const [message, setMessage] = useState<string>("")
  const [conn, setConn] = useState(false)
  useEffect(() => {
    // Establish WebSocket connection on mount
    const ws = new WebSocket("ws://localhost:8080")
    setSocket(ws)

    ws.onmessage = (ev) => {
      console.log(ev.data)

      setAllChats((prev) => [...prev, JSON.parse(ev.data)])
    }
    ws.onerror = (error) => {
      console.log(error)
    }
    return () => {
      // Cleanup WebSocket connection on unmount
      ws.close()
    }
  }, [])

  const sendMessage = () => {
    if (!socket || !message) return
    const newMessage = { name: username, message }
    setAllChats((prev) => [...prev, newMessage])
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: newMessage,
        },
      })
    )
    setMessage("")
  }

  const joinRoom = (input: string) => {
    setRoom(input)
    if (!username || !socket || !input) {
      console.error("Missing username, socket, or room details")
      return
    }
    console.log(`Joining room: ${input} as ${username}`)
    socket.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId: room,
        },
      })
    )
    setConn(true)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <>
      <Header room={room}></Header>
      {!conn ? (
        <Room
          setRoom={setRoom}
          room={room}
          joinRoom={joinRoom}
          username={username}
          setUsername={setUsername}
        />
      ) : (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-[40rem] ">
          <div className="chat-messages mt-8 overflow-y-auto h-full">
            {allChats.map((chat, index) =>
              chat.name === username ? (
                <div key={index} className="text-right">
                  <div className="bg-black p-2 rounded-md inline-block">
                    <span className="p-2 rounded-md  text-white">
                      {chat.message}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    <strong>{chat.name}</strong>
                  </div>
                </div>
              ) : (
                <div key={index} className="text-left">
                  <div className="bg-gray-200 p-2 rounded-md inline-block">
                    <span className="text-black">{chat.message}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    <strong>{chat.name}</strong>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="fixed bottom-0 w-4/5  border-t mb-4">
            <div className="flex mt-4 gap-2">
              <input
                type="text"
                className="flex h-10 w-full rounded-md border px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Send a message"
                onChange={handleInputChange}
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage()
                  }
                }}
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
  )
}

export default ChatArea
