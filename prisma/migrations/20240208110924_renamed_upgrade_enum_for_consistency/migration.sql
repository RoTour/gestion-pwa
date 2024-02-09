/*
  Warnings:

  - Changed the type of `type` on the `Upgrade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnumUpgradeType" AS ENUM ('PSV_INC', 'PROD_BOOST', 'MORE_PPL', 'EQL_PRICES');

-- AlterTable
ALTER TABLE "Upgrade" DROP COLUMN "type",
ADD COLUMN     "type" "EnumUpgradeType" NOT NULL;

-- DropEnum
DROP TYPE "UpgradeType";
