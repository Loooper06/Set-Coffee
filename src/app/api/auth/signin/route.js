import connectDb from "@/configs/db";
import UserModel from "@/models/User";
import {
  genRefreshToken,
  genrateAccessToken,
  valiadteEmail,
  valiadtePassword,
  verifyPassword,
} from "@/utils/auth";

export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const { email, password } = body;
    const isValidEmail = valiadteEmail(email);
    if (!isValidEmail)
      return Response.json(
        { message: "ایمیل معتبر نمی باشد" },
        { status: 401 }
      );
    const isValidPassword = valiadtePassword(password);
    if (!isValidPassword)
      return Response.json(
        { message: "رمز عبور معتبر نمی باشد" },
        { status: 401 }
      );

    const user = await UserModel.findOne({ email });
    if (!user)
      return Response.json(
        { message: "کاربری با این اطلاعات یافت نشد" },
        { status: 401 }
      );

    const isCorrectPass = await verifyPassword(password, user?.password || "");
    if (!isCorrectPass)
      return Response.json(
        { message: "ایمیل یا رمز عبور صحیح نیست" },
        { status: 401 }
      );

    const access_token = genrateAccessToken({ email: user.email });
    const refresh_token = genRefreshToken({ email: user.email });

    await UserModel.findOneAndUpdate(
      { email: user.email },
      { $set: { refreshToken: refresh_token } }
    );

    return Response.json(
      { message: "ورود با موفقیت انجام شد" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${access_token};path=/;httpOnly=true`,
        },
      }
    );
  } catch (err) {
    console.log("sigin ERR ->", err);
  }
}
