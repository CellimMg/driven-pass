-- CreateTable
CREATE TABLE "credenciais" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "credenciais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credenciais_email_key" ON "credenciais"("email");

-- AddForeignKey
ALTER TABLE "credenciais" ADD CONSTRAINT "credenciais_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
