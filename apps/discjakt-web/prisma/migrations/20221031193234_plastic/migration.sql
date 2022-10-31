-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "plasticId" INTEGER;

-- CreateTable
CREATE TABLE "Plastic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plastic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plastic_slug_key" ON "Plastic"("slug");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_plasticId_fkey" FOREIGN KEY ("plasticId") REFERENCES "Plastic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
