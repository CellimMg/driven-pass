import { Router } from "express";
import { createUser } from "../controllers/user_controller";
import { schemaValidate } from "../middlewares/schema_validate_middleware";
import userSchema from "../schemas/user_schema";

const userRoutes = Router();


userRoutes.post("/signup", schemaValidate(userSchema), createUser);


export default userRoutes;