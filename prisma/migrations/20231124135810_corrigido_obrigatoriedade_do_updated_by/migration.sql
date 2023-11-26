/*
  Warnings:

  - Made the column `updatedById` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedById` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedById` on table `Person` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_updatedById_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedById" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "updatedById" SET NOT NULL;

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "updatedById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
