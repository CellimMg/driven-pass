import {Router} from "express";
import { createCredencial } from "../controllers/credencial_controller";
import { schemaValidate } from "../middlewares/schema_validate_middleware";
import { tokenValidation } from "../middlewares/token_validate_middleware";
import createCredencialSchema from "../schemas/create_credencial_schema";

const credencialRoutes = Router();


credencialRoutes.post("/credencial", schemaValidate(createCredencialSchema), tokenValidation, createCredencial);

export default credencialRoutes;