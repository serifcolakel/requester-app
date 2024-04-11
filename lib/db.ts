/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export { db };

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
