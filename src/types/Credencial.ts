import {  Credencial } from "@prisma/client";

export type CredencialInsert = Omit<Credencial, "id">;
