import Link from "next/link";
import styles from "./Login.module.css";
import { useState } from "react";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { valiadteEmail, valiadtePassword } from "@/utils/auth";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => setIsLoginWithOtp(false);
  const loginWithPass = async () => {
    if (!phoneOrEmail.trim())
      return showSwal("شماره تماس یا ایمیل اجباری می باشد", "warning", "باشه");

    const isValidEmail = valiadteEmail(phoneOrEmail);
    if (!isValidEmail)
      return showSwal("ایمیل معتبر نمی باشد", "warning", "تلاش مجدد");

    if (!password.trim())
      return showSwal("رمز عبور نمی تواند خالی باشد", "warning", "تلاش مجدد");

    const isValidPassword = valiadtePassword(password);
    if (!isValidPassword)
      return showSwal("رمز عبور قوی نمی باشد", "warning", "تلاش مجدد");

    const user = JSON.stringify({ email: phoneOrEmail, password });
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    });
    const { message } = await res.json();
    if (res.status === 200) {
      showSwal(message, "success", "باشه");
    } else showSwal(message, "error", "تلاش مجدد");
  };

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="ایمیل/شماره موبایل"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn} onClick={loginWithPass}>
              ورود
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              className={styles.btn}
              onClick={() => setIsLoginWithOtp(true)}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>حساب کاربری ندارید؟</span>
            <button className={styles.btn_light} onClick={showRegisterForm}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
