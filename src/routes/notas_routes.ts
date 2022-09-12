import {Router} from "express";
import { createNota, deleteNotaById, readNotaById, readNotas } from "../controllers/notas_controller";
import { schemaValidate } from "../middlewares/schema_validate_middleware";
import { tokenValidation } from "../middlewares/token_validate_middleware";
import createNotaSchema from "../schemas/create_nota_schema";


const notasRoutes = Router();

notasRoutes.post("/nota", schemaValidate(createNotaSchema), tokenValidation, createNota);
notasRoutes.get("/nota", tokenValidation, readNotas);
notasRoutes.get("/nota/:id", tokenValidation, readNotaById);
notasRoutes.delete("/nota/:id", tokenValidation, deleteNotaById);

export default notasRoutes;