import { Server } from "socket.io";

let connection = {}
let message = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server)

    io.on("connection", (socket) => {

        socket.on("join-call", (path) => {


        })

        socket.on("signal", (told, message) => {
            io.to(told).emit("signal", socket.id, message)
        })

        socket.on("chat-message", (data, sender) => {

        })

        socket.on("disconnect", () => {
            
        })
    })

    return io;
}