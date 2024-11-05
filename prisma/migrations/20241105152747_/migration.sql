-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "redditUsername" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "ageRangeMin" INTEGER NOT NULL,
    "ageRangeMax" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "willingToRelocate" BOOLEAN NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "marriageTimeline" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_redditUsername_key" ON "Profile"("redditUsername");
