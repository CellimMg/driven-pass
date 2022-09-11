/*
  Warnings:

  - You are about to drop the `testes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `url` to the `credenciais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credenciais" ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "testes";
