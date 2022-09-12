import { Cartao } from "@prisma/client";

export type CartaoInsert = Omit<Cartao, "id">;