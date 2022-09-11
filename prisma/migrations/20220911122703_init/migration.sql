-- CreateTable
CREATE TABLE "SWitcher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ipaddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "SWitcher_ipaddress_key" ON "SWitcher"("ipaddress");
