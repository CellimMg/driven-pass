import { User } from "@prisma/client";
export type UserInsert = Omit<User, 'id'>;
export type UserPayload = Omit<User, "password">;
