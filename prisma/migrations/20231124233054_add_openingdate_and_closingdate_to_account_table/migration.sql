-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "closingDate" DATE,
ADD COLUMN     "openingDate" DATE NOT NULL DEFAULT '2000-01-01 00:00:00 +00:00';
