import httpStatus from "http-status";
import { userModel } from "../models/user-model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        // 1. Basic validation
        if (!name || !username || !password) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2. Check if user already exists
        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(httpStatus.FOUND).json({
                success: false,
                message: "Username already exists"
            });
        }

        // 3. Hashing of password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const newUser = await userModel.create({
            name: name,
            username: username,
            password: hashedPassword
        });

        // 5. Response
        return res.status(httpStatus.CREATED).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        // 2. Check user exists
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // 4. Generate JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            "SECRET_KEY", // ❌ bad practice (fix below)
            { expiresIn: "1d" }
        );

        // 5. Send response (NO PASSWORD)
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};