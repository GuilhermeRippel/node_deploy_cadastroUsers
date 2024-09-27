/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Installments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SimpleUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserWithPassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropForeignKey
ALTER TABLE "Installments" DROP CONSTRAINT "Installments_cardId_fkey";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Installments";

-- DropTable
DROP TABLE "SimpleUser";

-- DropTable
DROP TABLE "UserWithPassword";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
