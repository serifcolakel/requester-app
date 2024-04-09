import { db } from "@/lib/db";

export async function GET() {
  const user = await db.collection.findMany();

  return Response.json({
    data: user,
    message: "collections fetched successfully",
    code: 200,
  });
}
