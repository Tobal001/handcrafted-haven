/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `artisan_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `social_media_links` on the `artisan_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artisan_profiles" DROP COLUMN "avatar_url",
DROP COLUMN "social_media_links";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "average_rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "review_count" INTEGER NOT NULL DEFAULT 0;
