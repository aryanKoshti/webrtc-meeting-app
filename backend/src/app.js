import express from "express";
import { createServer } from "http";
import userRoutes from "./routes/user-route.js";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socket-manager.js";
import cors from "cors";

const app = express();
const server = createServer(app);

// ✅ Socket
connectToSocket(server);

// ✅ Middleware (ONLY ONCE, CLEAN ORDER)
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

// ✅ Routes
app.use("/api/users", userRoutes);

// ✅ Port
const PORT = process.env.PORT || 8000;

// ✅ Start server
const start = async () => {
    try {
        const connectionDb = await mongoose.connect(
            "mongodb+srv://video-call-user:965463@zoom.pm9lpdn.mongodb.net/zoom?retryWrites=true&w=majority"
        );

        console.log(`MONGO Connected: ${connectionDb.connection.host}`);

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
};

start();