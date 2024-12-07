"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount++;
    // allSockets.forEach((socket) => {
    //     socket.on("message", (message) => {
    //         socket.send(message.toString() + "from user #" + userCount)
    //     })
    // })
    socket.on("message", (message) => {
        allSockets.forEach((s) => {
            s.send(message.toString() + "from user #" + userCount);
        });
    });
    // socket.on("message", (message) => {
    //     console.log("message received " + message.toString() + " from user #" + userCount);
    //     socket.send(message.toString())
    // })
});
