import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes";
import credencialRoutes from "./routes/credencial_routes";

const server = express();

server.use(express.json());
server.use(cors());
server.use(userRoutes);
server.use(credencialRoutes);


server.listen(5000, () => {
    console.log("Server running at port 5000");
})