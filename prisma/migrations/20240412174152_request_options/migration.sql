-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('BEARER', 'BASIC');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('FORM_DATA', 'RAW');

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "name" SET DEFAULT 'New Request',
ALTER COLUMN "method" SET DEFAULT 'GET',
ALTER COLUMN "url" SET DEFAULT '',
ALTER COLUMN "body" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Authorization" (
    "_id" TEXT NOT NULL,
    "type" "AuthType" NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "Authorization_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Body" (
    "_id" TEXT NOT NULL,
    "type" "BodyType" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "Body_pkey" PRIMARY KEY ("_id")
);
