/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Preroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShortBanner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThumbnailSprite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeStamp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeStampVideos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Views` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Preroll" DROP CONSTRAINT "Preroll_videoId_fkey";

-- DropForeignKey
ALTER TABLE "ThumbnailSprite" DROP CONSTRAINT "ThumbnailSprite_videoId_fkey";

-- DropForeignKey
ALTER TABLE "TimeStamp" DROP CONSTRAINT "TimeStamp_videoId_fkey";

-- DropForeignKey
ALTER TABLE "TimeStampVideos" DROP CONSTRAINT "TimeStampVideos_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_videoId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToVideo" DROP CONSTRAINT "_CategoryToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToVideo" DROP CONSTRAINT "_CategoryToVideo_B_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Likes";

-- DropTable
DROP TABLE "Preroll";

-- DropTable
DROP TABLE "ShortBanner";

-- DropTable
DROP TABLE "ThumbnailSprite";

-- DropTable
DROP TABLE "TimeStamp";

-- DropTable
DROP TABLE "TimeStampVideos";

-- DropTable
DROP TABLE "Video";

-- DropTable
DROP TABLE "Views";

-- DropTable
DROP TABLE "_CategoryToVideo";
