import {Router} from "express";
import { createWifi, readWifi, readWifiById, deleteWifiById } from "../controllers/wifi_controller";
import { schemaValidate } from "../middlewares/schema_validate_middleware";
import { tokenValidation } from "../middlewares/token_validate_middleware";
import createWifiSchema from "../schemas/create_wifi_schema";

const wifiRoutes = Router();


wifiRoutes.post("/wifi", schemaValidate(createWifiSchema), tokenValidation, createWifi);
wifiRoutes.get("/wifi", tokenValidation, readWifi);
wifiRoutes.get("/wifi/:id", tokenValidation, readWifiById);
wifiRoutes.delete("/wifi/:id", tokenValidation, deleteWifiById);

export default wifiRoutes;