/*
  Warnings:

  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `visit` on the `Product` table. All the data in the column will be lost.
  - The `tag` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `vendorId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `previous_price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "storeId",
DROP COLUMN "visit",
ADD COLUMN     "vendorId" INTEGER NOT NULL,
ADD COLUMN     "visitCount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "previous_price",
ADD COLUMN     "previous_price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "comment" SET DEFAULT 0,
ALTER COLUMN "review" SET DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT true,
DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[];

-- AlterTable
ALTER TABLE "Vendor" ALTER COLUMN "rating" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
