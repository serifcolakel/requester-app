-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "Environment" DROP CONSTRAINT "Environment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Header" DROP CONSTRAINT "Header_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Params" DROP CONSTRAINT "Params_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Variable" DROP CONSTRAINT "Variable_environmentId_fkey";
