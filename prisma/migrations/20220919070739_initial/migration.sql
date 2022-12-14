-- CreateTable
CREATE TABLE "Switcher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ipaddress" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "turnOn" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Switcher_name_key" ON "Switcher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Switcher_ipaddress_key" ON "Switcher"("ipaddress");
