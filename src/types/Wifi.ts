import { Wifi } from "@prisma/client";

export type WifiInsert = Omit<Wifi, "id">;