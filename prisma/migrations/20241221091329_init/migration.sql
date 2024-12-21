/*
  Warnings:

  - You are about to drop the column `fb_link` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `instragram_link` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `twitter_link` on the `Vendor` table. All the data in the column will be lost.
  - The `status` column on the `Vendor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_sellerId_fkey";

-- DropIndex
DROP INDEX "Vendor_sellerId_key";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "fb_link",
DROP COLUMN "instragram_link",
DROP COLUMN "sellerId",
DROP COLUMN "twitter_link",
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "total_product" SET DEFAULT 0,
ALTER COLUMN "total_reviews" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_name_key" ON "Vendor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_phone_number_key" ON "Vendor"("phone_number");

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
