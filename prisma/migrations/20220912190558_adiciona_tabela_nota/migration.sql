-- CreateTable
CREATE TABLE "notas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "anotacao" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "notas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notas" ADD CONSTRAINT "notas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
