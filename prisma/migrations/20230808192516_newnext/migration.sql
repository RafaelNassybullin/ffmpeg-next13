-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "likesCount" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preroll" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "prerollLink" TEXT NOT NULL,

    CONSTRAINT "Preroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortBanner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ShortBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThumbnailSprite" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "sprite" TEXT NOT NULL,

    CONSTRAINT "ThumbnailSprite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeStamp" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "newTimeId" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "TimeStamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeStampVideos" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "videoTimeStamp" TEXT NOT NULL,

    CONSTRAINT "TimeStampVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durationTime" TEXT NOT NULL,
    "videoUuidSlug" TEXT NOT NULL,
    "miniature" TEXT NOT NULL,
    "spriteImg" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Views" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "viewsCount" TEXT NOT NULL,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Likes_videoId_key" ON "Likes"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Preroll_videoId_key" ON "Preroll"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "ThumbnailSprite_videoId_key" ON "ThumbnailSprite"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeStamp_videoId_key" ON "TimeStamp"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeStampVideos_videoId_key" ON "TimeStampVideos"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_videoUrl_key" ON "Video"("videoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Video_videoUuidSlug_key" ON "Video"("videoUuidSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Views_videoId_key" ON "Views"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToVideo_AB_unique" ON "_CategoryToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToVideo_B_index" ON "_CategoryToVideo"("B");

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preroll" ADD CONSTRAINT "Preroll_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThumbnailSprite" ADD CONSTRAINT "ThumbnailSprite_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeStamp" ADD CONSTRAINT "TimeStamp_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeStampVideos" ADD CONSTRAINT "TimeStampVideos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToVideo" ADD CONSTRAINT "_CategoryToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToVideo" ADD CONSTRAINT "_CategoryToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
