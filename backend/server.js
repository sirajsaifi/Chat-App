import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import debug from 'debug';
debug('socket.io:server')

import { app, server } from "./socket/socket.js";

dotenv.config({ path: './config.env' });

const __dirname = path.resolve();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.set('strictQuery', true)

mongoose.connect(DB)
	.then(() => {
		console.log('DB connected successfully')
	}).catch((err) => {
		console.log('UNHANDLED REJECTION. Shutting down...')
		console.log('DB connection error', err.name, err.message)
		console.error(err)
		server.close(() => {    //gives time to the server to complete all the pending work
			process.exit(1)
		})
	})

const PORT = process.env.PORT || 3200;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});
