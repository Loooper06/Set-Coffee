import { useState } from "react";
import Link from "next/link";
import styles from "./Register.module.css";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { valiadteEmail, valiadtePassword, valiadtePhone } from "@/utils/auth";

const Register = ({ showloginForm }) => {
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };
  const signUpHandler = async () => {
    if (!name.trim())
      return showSwal("نام خود را وارد کنید", "warning", "تلاش مجدد");

    const isValidPhone = valiadtePhone(phone);
    if (!isValidPhone)
      return showSwal("شماره تماس معتبر نمی باشد", "warning", "تلاش مجدد");
    const isValidEmail = valiadteEmail(email);
    if (!isValidEmail)
      return showSwal("ایمیل معتبر نمی باشد", "warning", "تلاش مجدد");
    const isValidPassword = valiadtePassword(password);
    if (!isValidPassword)
      return showSwal("رمز عبور معتبر نمی باشد", "warning", "تلاش مجدد");

    const user = {
      name,
      phone,
      email,
      password,
    };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const { message } = await res.json();
    if (res.status === 201) {
      resetForm();
      showSwal(message, "success", "ورود به پنل کاربری");
    } else showSwal(message, "error", "تلاش مجدد");
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isRegisterWithPass && (
              <input
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
            <button
              style={{ marginTop: "2rem" }}
              className={styles.btn}
              onClick={() => {
                setIsRegisterWithOtp(true);
                setIsRegisterWithPass(false);
              }}
            >
              ثبت نام با کد تایید
            </button>
            <button
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
              onClick={() => {
                if (isRegisterWithPass) signUpHandler();
                else {
                  setIsRegisterWithPass(true);
                  setIsRegisterWithOtp(false);
                }
              }}
            >
              ثبت نام با رمزعبور
            </button>
            <p className={styles.back_to_login} onClick={showloginForm}>
              برگشت به ورود
            </p>
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

export default Register;
