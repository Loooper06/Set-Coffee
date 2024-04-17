import { useState } from "react";
import Link from "next/link";
import styles from "./Register.module.css";
import Sms from "./Sms";

const Register = ({ showloginForm }) => {
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [registerWithPass, setRegisterWithPass] = useState(false);

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input className={styles.input} type="text" placeholder="نام" />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {registerWithPass && (
              <input
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
              />
            )}
            <button
              style={{ marginTop: "2rem" }}
              className={styles.btn}
              onClick={() => {
                setIsRegisterWithOtp(true);
                setRegisterWithPass(false);
              }}
            >
              ثبت نام با کد تایید
            </button>
            <button
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
              onClick={() => {
                setRegisterWithPass(true);
                setIsRegisterWithOtp(false);
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
