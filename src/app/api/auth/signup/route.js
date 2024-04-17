import connectDb from "../../../../../configs/db";

export async function GET(req) {
  await connectDb();
  return Response.json({ message: "connect to db test" }, { status: 201 });
}
