import connectDb from "@/configs/db";
import UserModel from "@/models/User";
import {
  hashPassword,
  genrateAccessToken,
  valiadtePhone,
  valiadteEmail,
  valiadtePassword,
} from "@/utils/auth";
import { ROLES } from "@/utils/constants";

export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const { email, password, name, phone } = body;
    if (!name.trim())
      return Response.json(
        { message: "نام و نام خانوادگی معتبر نمی باشد" },
        { status: 401 }
      );
    const isValidPhone = valiadtePhone(phone);
    if (!isValidPhone)
      return Response.json(
        { message: "شماره تماس معتبر نمی باشد" },
        { status: 401 }
      );
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

    const isUserExist = await UserModel.findOne({
      $or: [{ name }, { email }, { phone }],
    });
    if (isUserExist)
      return Response.json(
        { message: "شما قبلا ثبت نام کرده اید!" },
        { status: 422 }
      );
    const users = await UserModel.find({}).countDocuments();
    const newUser = {
      name,
      phone,
      email,
      role: users > 0 ? ROLES.USER : ROLES.ADMIN,
    };
    let hashedPassword = null;
    if (password) {
      hashedPassword = await hashPassword(password);
      newUser["password"] = hashedPassword;
    }
    const access_token = genrateAccessToken({ name });
    await UserModel.create(newUser);

    return Response.json(
      { message: "ثبت نام با موفقیت انجام شد" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${access_token};path=/;httpOnly=true`,
        },
      }
    );
  } catch (err) {
    console.log("signup ERR ->", err);
  }
}
