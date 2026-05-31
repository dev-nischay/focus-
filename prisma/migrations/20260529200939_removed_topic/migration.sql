/*
  Warnings:

  - You are about to drop the column `topic` on the `SessionNotes` table. All the data in the column will be lost.
  - Made the column `goal` on table `FocusSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FocusSession" ALTER COLUMN "goal" SET NOT NULL,
ALTER COLUMN "goal" DROP DEFAULT;

-- AlterTable
ALTER TABLE "SessionNotes" DROP COLUMN "topic";
