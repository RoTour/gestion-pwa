/*
  Warnings:

  - You are about to drop the `Citizen` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `Resources` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Citizen" DROP CONSTRAINT "Citizen_playerId_fkey";

-- AlterTable
ALTER TABLE "Resources" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Resources_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Citizen";

-- CreateTable
CREATE TABLE "Workforce" (
    "amount" INTEGER NOT NULL DEFAULT 0,
    "resource" "EnumResource" NOT NULL DEFAULT 'WOOD',
    "playerId" TEXT NOT NULL,

    CONSTRAINT "Workforce_pkey" PRIMARY KEY ("playerId","resource")
);

-- AddForeignKey
ALTER TABLE "Workforce" ADD CONSTRAINT "Workforce_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
