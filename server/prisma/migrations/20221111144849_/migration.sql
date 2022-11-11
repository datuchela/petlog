/*
  Warnings:

  - You are about to drop the column `dateString` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `upcoming` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reminder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "upcoming" TEXT NOT NULL,
    "intervalValue" INTEGER NOT NULL,
    "intervalType" TEXT NOT NULL,
    "petId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Reminder_upcoming_fkey" FOREIGN KEY ("upcoming") REFERENCES "Date" ("date") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reminder_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reminder" ("id", "intervalType", "intervalValue", "name", "petId", "userId") SELECT "id", "intervalType", "intervalValue", "name", "petId", "userId" FROM "Reminder";
DROP TABLE "Reminder";
ALTER TABLE "new_Reminder" RENAME TO "Reminder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
