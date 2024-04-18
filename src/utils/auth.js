import { hash, compare, genSalt } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import UserModel from "@/models/User";
import connectDb from "@/configs/db";

const hashPassword = async (pass) => {
  const salt = await genSalt(12);
  const hashedPass = await hash(pass, salt);
  return hashedPass;
};

const verifyPassword = async (pass, hashedPassword) => {
  const isValid = await compare(pass, hashedPassword);
  return isValid;
};

const genrateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60d",
  });
  return token;
};

const verifyAccessToken = async (token) => {
  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return payload;
  } catch (err) {
    console.log("verify access token Error ->", err);
    return false;
  }
};

const genRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
  return token;
};

const valiadteEmail = (email) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

const valiadtePhone = (phone) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

const valiadtePassword = (password) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};

const authUser = async (token) => {
  let user = null;
  if (token) {
    const payload = verifyAccessToken(token.value);
    if (payload) {
      await connectDb();
      user = await UserModel.findOne({ email: payload.email });
      user = JSON.parse(JSON.stringify(user));
    }
  }
  return user;
};

export {
  hashPassword,
  verifyPassword,
  genrateAccessToken,
  verifyAccessToken,
  genRefreshToken,
  valiadteEmail,
  valiadtePhone,
  valiadtePassword,
  authUser,
};
