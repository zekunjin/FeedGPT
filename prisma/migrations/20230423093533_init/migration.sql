/*
  Warnings:

  - You are about to drop the column `vector` on the `Sentence` table. All the data in the column will be lost.
  - Added the required column `vectors` to the `Sentence` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sentence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "vectors" TEXT NOT NULL,
    "storeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Sentence" ("content", "createdAt", "id", "storeId", "updatedAt") SELECT "content", "createdAt", "id", "storeId", "updatedAt" FROM "Sentence";
DROP TABLE "Sentence";
ALTER TABLE "new_Sentence" RENAME TO "Sentence";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
