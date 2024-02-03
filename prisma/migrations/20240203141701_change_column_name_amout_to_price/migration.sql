/*
  Warnings:

  - You are about to drop the column `amount` on the `ResourcePrice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ResourcePrice" DROP COLUMN "amount",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 50;
