import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/Product/Gallery";
import Details from "@/components/templates/Product/Details";
import Tabs from "@/components/templates/Product/Tabs";
import MoreProducts from "@/components/templates/Product/MoreProducts";

import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import { authUser } from "@/utils/auth";

const productDetail = async () => {
  const user = await authUser();
  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details />
          <Gallery />
        </div>
        <Tabs />
        <MoreProducts />
      </div>
      <Footer />
    </div>
  );
};

export default productDetail;
