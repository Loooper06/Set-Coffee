"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Navbar = ({ isLogin }) => {
  const [fixedTop, setFixTop] = useState(false);

  useEffect(() => {
    const fixNavbarToTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll >= 120) setFixTop(true);
      else setFixTop(false);
    };
    window.addEventListener("scroll", fixNavbarToTop);
    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  return (
    <nav className={fixedTop ? styles.navbar_fixed : styles.navbar}>
      <main>
        <div>
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              height={60}
              width={150}
              priority={true}
            />
          </Link>
        </div>
        <ul className={styles.links}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/category">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blog">وبلاگ</Link>
          </li>
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/about-us">درباره ما</Link>
          </li>
          <li>
            <Link href="/rules">قوانین</Link>
          </li>
          {isLogin ? (
            <div className={styles.dropdown}>
              <Link href="/p-user">
                <MdOutlineKeyboardArrowDown className={styles.dropdown_icons} />
                حساب کاربری
              </Link>
              <div className={styles.dropdown_content}>
                <Link href="/p-user/orders">سفارشات</Link>
                <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                <Link href="/p-user/comments">کامنت ها</Link>
                <Link href="/p-user/wishlist">علاقه مندی ها</Link>
                <Link href="/p-user/account-details">جزییات حساب</Link>
              </div>
            </div>
          ) : (
            <li>
              <Link href="/login-register">ورود / عضویت</Link>
            </li>
          )}
        </ul>
        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <AiOutlineShoppingCart />
            <span>1</span>
          </Link>
          <Link href="/whishlist">
            <FaRegHeart />
            <span>1</span>
          </Link>
        </div>
      </main>
    </nav>
  );
};

export default Navbar;
