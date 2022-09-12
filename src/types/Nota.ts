import { Nota } from "@prisma/client";

export type NotaInsert = Omit<Nota, "id">;