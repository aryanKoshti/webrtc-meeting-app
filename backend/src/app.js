import express from "express";
import { createServer } from "http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());

const start = async () => {
    try {
        app.set("mongo_user")
        const connectionDb = await mongoose.connect("mongodb+srv://video-call-user:965463@zoom.pm9lpdn.mongodb.net/zoom?retryWrites=true&w=majority");
        console.log(`MONGO Connected DB host: ${connectionDb.connection.host}`)

        server.listen(app.get("port"), () => {
            console.log("server is listening on port 8000");
        });

    } catch (err) {
        console.log(err);
    }
};

start();