-- AlterTable
ALTER TABLE "LiveStream" ADD COLUMN     "commentEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "commentModeration" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyFollowers" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyTiming" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "orientation" TEXT NOT NULL DEFAULT 'vertical',
ADD COLUMN     "qualitySetting" TEXT NOT NULL DEFAULT 'auto',
ADD COLUMN     "shopUrl" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'public';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "has_seen_tutorial" BOOLEAN NOT NULL DEFAULT false;
