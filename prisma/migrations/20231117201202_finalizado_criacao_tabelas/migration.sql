-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('Caixa', 'Banco');

-- CreateEnum
CREATE TYPE "PersonRelationship" AS ENUM ('Membro', 'Visitante', 'Coligado', 'Inativo');

-- CreateEnum
CREATE TYPE "PhoneNumberType" AS ENUM ('Celular', 'Residencial', 'Comercial', 'Contado');

-- CreateEnum
CREATE TYPE "PersonGender" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "FinancialMovementType" AS ENUM ('DizimoOferta', 'Entrada', 'Saida', 'Transferencia');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "openingBalance" DECIMAL(12,2) NOT NULL,
    "enable" BOOLEAN NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Church" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT,
    "nickname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "foneNumber" TEXT,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "relationship" "PersonRelationship" NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "email" TEXT,
    "gender" "PersonGender" NOT NULL,
    "birthDate" DATE,
    "rg" TEXT,
    "cpf" TEXT,
    "phoneNumber1Type" "PhoneNumberType",
    "phoneNumber1" TEXT,
    "phoneNumber1IsWhatsapp" BOOLEAN,
    "phoneNumber2Type" "PhoneNumberType",
    "phoneNumber2" TEXT,
    "phoneNumber2IsWhatsapp" BOOLEAN,
    "addressStreet" TEXT,
    "addressNumber" TEXT,
    "addressNeighborhood" TEXT,
    "addressComplement" TEXT,
    "addressCityId" INTEGER,
    "addressZipCode" TEXT,
    "additionalInformation" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialMovement" (
    "id" SERIAL NOT NULL,
    "type" "FinancialMovementType" NOT NULL,
    "date" DATE NOT NULL,
    "description" TEXT,
    "personId" INTEGER,
    "categoryId" INTEGER,
    "accountInputId" INTEGER,
    "accountOutputId" INTEGER,
    "value" DECIMAL(12,2) NOT NULL,
    "canceled" BOOLEAN NOT NULL DEFAULT false,
    "userCreateId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userCancelId" INTEGER,
    "canceledAt" TIMESTAMP(3),

    CONSTRAINT "FinancialMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Params" (
    "param" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Params_pkey" PRIMARY KEY ("param")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_addressCityId_fkey" FOREIGN KEY ("addressCityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMovement" ADD CONSTRAINT "FinancialMovement_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMovement" ADD CONSTRAINT "FinancialMovement_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMovement" ADD CONSTRAINT "FinancialMovement_accountInputId_fkey" FOREIGN KEY ("accountInputId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMovement" ADD CONSTRAINT "FinancialMovement_accountOutputId_fkey" FOREIGN KEY ("accountOutputId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMovement" ADD CONSTRAINT "FinancialMovement_userCreateId_fkey" FOREIGN KEY ("userCreateId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMovement" ADD CONSTRAINT "FinancialMovement_userCancelId_fkey" FOREIGN KEY ("userCancelId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
