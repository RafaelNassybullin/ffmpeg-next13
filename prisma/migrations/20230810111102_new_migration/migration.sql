/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Card_name_key";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_slug_key" ON "Card"("slug");
