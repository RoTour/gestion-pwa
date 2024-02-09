-- CreateEnum
CREATE TYPE "UpgradeType" AS ENUM ('PSV_INC', 'PROD_BOOST', 'MORE_PPL', 'EQL_PRICES');

-- CreateTable
CREATE TABLE "Upgrade" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "type" "UpgradeType" NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "Upgrade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Upgrade" ADD CONSTRAINT "Upgrade_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
