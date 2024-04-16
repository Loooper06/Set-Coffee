import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import styles from "./Latest.module.css";
import Product from "@/components/modules/Product/Product";

const Latest = () => {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />{" "}
        </Link>
      </section>
      <main data-aos="fade-up" className={styles.products}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </main>
    </div>
  );
};

export default Latest;
