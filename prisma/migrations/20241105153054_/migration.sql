/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_Profile" ("age", "ageRangeMax", "ageRangeMin", "bio", "createdAt", "gender", "id", "location", "maritalStatus", "marriageTimeline", "redditUsername", "updatedAt", "willingToRelocate") SELECT "age", "ageRangeMax", "ageRangeMin", "bio", "createdAt", "gender", "id", "location", "maritalStatus", "marriageTimeline", "redditUsername", "updatedAt", "willingToRelocate" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_redditUsername_key" ON "Profile"("redditUsername");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
