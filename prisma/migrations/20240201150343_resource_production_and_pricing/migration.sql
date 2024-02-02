-- CreateEnum
CREATE TYPE "EnumResource" AS ENUM ('WOOD', 'MARBLE', 'WINE', 'SULFUR', 'CRYSTAL');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "maxCitizens" INTEGER NOT NULL DEFAULT 50;

-- CreateTable
CREATE TABLE "Citizen" (
    "amount" INTEGER NOT NULL DEFAULT 0,
    "resource" "EnumResource" NOT NULL DEFAULT 'WOOD',
    "playerId" TEXT NOT NULL,

    CONSTRAINT "Citizen_pkey" PRIMARY KEY ("playerId","resource")
);

-- CreateTable
CREATE TABLE "ResourcePrice" (
    "resource" "EnumResource" NOT NULL DEFAULT 'WOOD',
    "amount" INTEGER NOT NULL DEFAULT 50,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourcePrice_resource_key" ON "ResourcePrice"("resource");

-- AddForeignKey
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
