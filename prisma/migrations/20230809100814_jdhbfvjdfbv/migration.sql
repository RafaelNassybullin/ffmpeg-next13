-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Views" (
    "id" SERIAL NOT NULL,
    "cardID" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "cardID" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeStamp" (
    "id" SERIAL NOT NULL,
    "cardID" INTEGER NOT NULL,
    "timeID" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "TimeStamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Views_cardID_key" ON "Views"("cardID");

-- CreateIndex
CREATE UNIQUE INDEX "Likes_cardID_key" ON "Likes"("cardID");

-- CreateIndex
CREATE UNIQUE INDEX "TimeStamp_cardID_key" ON "TimeStamp"("cardID");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToCategory_AB_unique" ON "_CardToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToCategory_B_index" ON "_CardToCategory"("B");

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_cardID_fkey" FOREIGN KEY ("cardID") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_cardID_fkey" FOREIGN KEY ("cardID") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeStamp" ADD CONSTRAINT "TimeStamp_cardID_fkey" FOREIGN KEY ("cardID") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToCategory" ADD CONSTRAINT "_CardToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToCategory" ADD CONSTRAINT "_CardToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
