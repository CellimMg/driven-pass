import {Router} from "express";
import { createCartao, deleteCartaoById, readCartao, readCartaoById } from "../controllers/cartao_controller";
import { schemaValidate } from "../middlewares/schema_validate_middleware";
import { tokenValidation } from "../middlewares/token_validate_middleware";
import createCartaoSchema from "../schemas/create_cartao_schema";


const cartaoRoutes = Router();

cartaoRoutes.post("/cartao", schemaValidate(createCartaoSchema), tokenValidation, createCartao);
cartaoRoutes.get("/cartao", tokenValidation, readCartao);
cartaoRoutes.get("/cartao/:id", tokenValidation, readCartaoById);
cartaoRoutes.delete("/cartao/:id", tokenValidation, deleteCartaoById);


export default cartaoRoutes;