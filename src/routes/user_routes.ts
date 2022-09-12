import { Router } from "express";
import { createUser, signinUser } from "../controllers/user_controller";
import { schemaValidate } from "../middlewares/schema_validate_middleware";
import signinSchema from "../schemas/signin_schema";
import signupSchema from "../schemas/signup_schema";

const userRoutes = Router();


userRoutes.post("/signup", schemaValidate(signupSchema), createUser);
userRoutes.post("/signin", schemaValidate(signinSchema), signinUser); 


export default userRoutes;