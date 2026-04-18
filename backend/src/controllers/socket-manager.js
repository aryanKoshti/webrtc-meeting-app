import { connections } from "mongoose";
import { Server } from "socket.io";

let connection = {}
let message = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    })


    io.on("connection", (socket) => {

        socket.on("join-call", (path) => {
            if(connections[path] == undefined) {
                connections[path] = []
            }
            connections[path].push(socket.id)

            timeOnline[socket.id] = new Date();

            connections[path].forEach(elem => {
                io.to(elem).emit("chat-message", message[path][a]['data'],
                    message[path][a]['sender', messages[path][a]['socket-id-sender']]
                )
            })
        })

        socket.on("signal", (told, message) => {
            io.to(told).emit("signal", socket.id, message)
        })

        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomkey, roomValue]) => {

                     if(!isFound && roomValue.inclues(socket.id)) {
                    return [roomkey, true];
                }

                return [room, isFound];
                }, ['', false]);

                if(found == true) {
                    if(messages[matchingRoom] == undefined) {
                        message[matchingRoom] = []
                    }

                    message[matchingRoom].push({'sender': sender, "data": data, "socket-id-sender": socket.id})

                    console.log("message", KeyboardEvent, ":", sender, data)

                    connections[matchingRoom].forEach((elem) => {
                        io.to(elem).emit("chat-message", data, sender, socket.id)
                    })
                }
      
        })

        socket.on("disconnect", () => {
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for(const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                for (let a = 0; a < v.length; ++a) {
                    if(v[a] == socket.id) {
                        key = k

                        for(let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index =connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)

                        if(connections[key].length == 0) {
                            delete connections[key]
                        }
                    }
                }
            }
        })
    })

    return io;
}