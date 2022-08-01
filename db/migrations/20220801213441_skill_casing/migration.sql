/*
  Warnings:

  - You are about to drop the column `careerid` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `gameid` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `isdeleted` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `learningscript` on the `skill` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `learningScript` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "skill" DROP CONSTRAINT "skill_careerid_fkey";

-- AlterTable
ALTER TABLE "skill" DROP COLUMN "careerid",
DROP COLUMN "gameid",
DROP COLUMN "isdeleted",
DROP COLUMN "learningscript",
ADD COLUMN     "careerId" UUID,
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL,
ADD COLUMN     "learningScript" VARCHAR NOT NULL;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;
