import { User } from "@prisma/client";

export type UserInsert = Omit<User, 'id'>;