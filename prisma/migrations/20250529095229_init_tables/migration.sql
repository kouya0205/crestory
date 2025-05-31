/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bankAccount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `credits` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentStreak` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `experiencePoints` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_seen_tutorial` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastCreditReset` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longestStreak` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingCompleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pwHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skillLevel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinks` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedSeller` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AiInteractionLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiveStream` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectAsset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedWork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserQuestProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LiveStreamToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserBadges` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LifeEventTag" AS ENUM ('BIRTH', 'CHILDHOOD', 'STUDENT_DAYS', 'FIRST_JOB', 'CAREER_CHANGE', 'MARRIAGE', 'CHILDBIRTH', 'PARENTING', 'HOBBY', 'TRAVEL', 'TURNING_POINT', 'HEALTH', 'OTHER');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'FAMILY_ONLY');

-- CreateEnum
CREATE TYPE "FamilyMembershipStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "AiInteractionLog" DROP CONSTRAINT "AiInteractionLog_projectId_fkey";

-- DropForeignKey
ALTER TABLE "AiInteractionLog" DROP CONSTRAINT "AiInteractionLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_livestreamId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_sharedWorkId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_sharedWorkId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "LiveStream" DROP CONSTRAINT "LiveStream_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectAsset" DROP CONSTRAINT "ProjectAsset_aiInteractionId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectAsset" DROP CONSTRAINT "ProjectAsset_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_rewardBadgeId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedWork" DROP CONSTRAINT "SharedWork_assetId_fkey";

-- DropForeignKey
ALTER TABLE "SharedWork" DROP CONSTRAINT "SharedWork_projectId_fkey";

-- DropForeignKey
ALTER TABLE "SharedWork" DROP CONSTRAINT "SharedWork_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestProgress" DROP CONSTRAINT "UserQuestProgress_questId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestProgress" DROP CONSTRAINT "UserQuestProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "_LiveStreamToProduct" DROP CONSTRAINT "_LiveStreamToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_LiveStreamToProduct" DROP CONSTRAINT "_LiveStreamToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserBadges" DROP CONSTRAINT "_UserBadges_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBadges" DROP CONSTRAINT "_UserBadges_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "bankAccount",
DROP COLUMN "bio",
DROP COLUMN "credits",
DROP COLUMN "currentStreak",
DROP COLUMN "emailVerified",
DROP COLUMN "experiencePoints",
DROP COLUMN "has_seen_tutorial",
DROP COLUMN "image",
DROP COLUMN "interests",
DROP COLUMN "lastCreditReset",
DROP COLUMN "longestStreak",
DROP COLUMN "name",
DROP COLUMN "onboardingCompleted",
DROP COLUMN "phoneNumber",
DROP COLUMN "pwHash",
DROP COLUMN "role",
DROP COLUMN "skillLevel",
DROP COLUMN "socialLinks",
DROP COLUMN "verifiedSeller",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "iconUrl" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "AiInteractionLog";

-- DropTable
DROP TABLE "Analytics";

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "ChatMessage";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "LiveStream";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectAsset";

-- DropTable
DROP TABLE "Quest";

-- DropTable
DROP TABLE "Region";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "SharedWork";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "UserPreference";

-- DropTable
DROP TABLE "UserQuestProgress";

-- DropTable
DROP TABLE "_LiveStreamToProduct";

-- DropTable
DROP TABLE "_UserBadges";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "birthDate" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3),
    "lifeEventTag" "LifeEventTag",
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "familyIdString" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMembership" (
    "id" TEXT NOT NULL,
    "status" "FamilyMembershipStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requesterId" TEXT NOT NULL,
    "targetFamilyOwnerId" TEXT NOT NULL,
    "familyId" TEXT,
    "memberUserId" TEXT,

    CONSTRAINT "FamilyMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Family_familyIdString_key" ON "Family"("familyIdString");

-- CreateIndex
CREATE UNIQUE INDEX "Family_ownerId_key" ON "Family"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyMembership_requesterId_targetFamilyOwnerId_key" ON "FamilyMembership"("requesterId", "targetFamilyOwnerId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMembership" ADD CONSTRAINT "FamilyMembership_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMembership" ADD CONSTRAINT "FamilyMembership_targetFamilyOwnerId_fkey" FOREIGN KEY ("targetFamilyOwnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMembership" ADD CONSTRAINT "FamilyMembership_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMembership" ADD CONSTRAINT "FamilyMembership_memberUserId_fkey" FOREIGN KEY ("memberUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
