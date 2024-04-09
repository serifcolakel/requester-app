-- CreateEnum
CREATE TYPE "Method" AS ENUM ('GET', 'POST', 'PUT', 'DELETE');

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Environment" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Variable" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "environmentId" TEXT NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "collectionId" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Request" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" "Method" NOT NULL,
    "url" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Header" (
    "_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "Header_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Params" (
    "_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "Params_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Response" (
    "_id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Environment" ADD CONSTRAINT "Environment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variable" ADD CONSTRAINT "Variable_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Header" ADD CONSTRAINT "Header_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Params" ADD CONSTRAINT "Params_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
