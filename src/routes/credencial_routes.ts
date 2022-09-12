import {Router} from "express";
import { createCredencial, readCredencial, readCredencialById, deleteCredencialById } from "../controllers/credencial_controller";
import { schemaValidate } from "../middlewares/schema_validate_middleware";
import { tokenValidation } from "../middlewares/token_validate_middleware";
import createCredencialSchema from "../schemas/create_credencial_schema";

const credencialRoutes = Router();


credencialRoutes.post("/credencial", schemaValidate(createCredencialSchema), tokenValidation, createCredencial);
credencialRoutes.get("/credencial", tokenValidation, readCredencial);
credencialRoutes.get("/credencial/:id", tokenValidation, readCredencialById);
credencialRoutes.delete("/credencial/:id", tokenValidation, deleteCredencialById);

export default credencialRoutes;