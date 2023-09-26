/*
  Warnings:

  - You are about to drop the column `timeID` on the `TimeStamp` table. All the data in the column will be lost.
  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_cardID_fkey";

-- AlterTable
ALTER TABLE "TimeStamp" DROP COLUMN "timeID";

-- DropTable
DROP TABLE "Likes";
