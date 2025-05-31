/*
  Warnings:

  - You are about to drop the column `iconUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "iconUrl",
ADD COLUMN     "image" TEXT;
