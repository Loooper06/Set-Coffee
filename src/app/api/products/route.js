import connectDb from "@/configs/db";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const {
      name,
      price,
      short_description,
      description,
      weight,
      suitable,
      smell,
      tags,
    } = body;

    const product = await ProductModel.create({
      name,
      price,
      short_description,
      description,
      weight,
      suitable,
      smell,
      tags,
    });

    return Response.json(
      { product, message: "محصول با موفقیت ایجاد شد" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 401 });
  }
}

export async function GET() {
  try {
    const products = await ProductModel.find({}).populate("comments");
    return Response.json({ products }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 401 });
  }
}
