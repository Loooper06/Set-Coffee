import connectDb from "@/configs/db";
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    await connectDb();
    const reqBody = await req.json();
    const { username, body, email, score, product } = reqBody;

    const isExistProduct = await ProductModel.findById(product);
    if (!isExistProduct)
      return Response.json(
        { message: "محصول برای ثبت نظر بافت نشد" },
        { status: 404 }
      );

    // todo validation
    // todo validation

    const comment = await CommentModel.create({
      username,
      body,
      email,
      score,
      product: isExistProduct._id,
    });

    await ProductModel.findByIdAndUpdate(
      { _id: product },
      { $push: { comments: comment._id } }
    );

    return Response.json(
      { message: "نظر شما با موفقیت ثبت شد" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 401 });
  }
}
export async function GET() {
  try {
    const comments = await CommentModel.find({},"-__v").populate("product");
    return Response.json({ comments }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 401 });
  }
}
