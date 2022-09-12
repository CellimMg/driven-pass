import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes";
import credencialRoutes from "./routes/credencial_routes";
import notasRoutes from "./routes/notas_routes";
import dotenv from "dotenv";
dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(userRoutes);
server.use(credencialRoutes);
server.use(notasRoutes);



server.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
})