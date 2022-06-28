-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nextMine" TIMESTAMP(3),
    "bits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
