"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = new Map();
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parseMessage = JSON.parse(message);
        if (parseMessage.type === "join") {
            allSockets.set(socket, parseMessage.payload.roomId);
        }
        if (parseMessage.type === "chat") {
            const currentUserRoom = allSockets.get(socket);
            if (!currentUserRoom)
                return;
            for (const [s, roomId] of allSockets.entries()) {
                if (roomId === currentUserRoom && socket !== s) {
                    s.send(parseMessage.payload.message);
                }
            }
        }
    });
    socket.on("close", () => {
        allSockets.delete(socket);
    });
});
