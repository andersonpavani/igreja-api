-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Administrador', 'Usuario');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'Usuario';
