-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resources" (
    "gold" INTEGER NOT NULL,
    "wood" INTEGER NOT NULL,
    "marble" INTEGER NOT NULL,
    "wine" INTEGER NOT NULL,
    "sulfur" INTEGER NOT NULL,
    "crystal" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Resources_playerId_key" ON "Resources"("playerId");

-- AddForeignKey
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
