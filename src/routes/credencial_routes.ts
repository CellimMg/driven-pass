import {Router} from "express";
import { createCredencial, readCredencial, readCredencialById } from "../controllers/credencial_controller";
import { schemaValidate } from "../middlewares/schema_validate_middleware";
import { tokenValidation } from "../middlewares/token_validate_middleware";
import createCredencialSchema from "../schemas/create_credencial_schema";

const credencialRoutes = Router();


credencialRoutes.post("/credencial", schemaValidate(createCredencialSchema), tokenValidation, createCredencial);
credencialRoutes.get("/credencial", tokenValidation, readCredencial);
credencialRoutes.get("/credencial/:id", tokenValidation, readCredencialById);

export default credencialRoutes;