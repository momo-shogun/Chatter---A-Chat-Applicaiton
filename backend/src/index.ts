import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets = new Map<WebSocket, string>();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parseMessage = JSON.parse(message as unknown as string);

    if (parseMessage.type === "join") {
      allSockets.set(socket, parseMessage.payload.roomId);
    }

    if (parseMessage.type === "chat") {
      const currentUserRoom = allSockets.get(socket);
      if (!currentUserRoom) return;

      for (const [s, roomId] of allSockets.entries()) {
        if (roomId === currentUserRoom && socket !== s) {
          s.send(JSON.stringify(parseMessage.payload.message));
        }
      }
    }
  });
  socket.on("close", () => {
    allSockets.delete(socket);
  });
});
