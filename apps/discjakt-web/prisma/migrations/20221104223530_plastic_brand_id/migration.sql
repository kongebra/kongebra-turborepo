/*
  Warnings:

  - Added the required column `brandId` to the `Plastic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plastic" ADD COLUMN     "brandId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Plastic" ADD CONSTRAINT "Plastic_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
