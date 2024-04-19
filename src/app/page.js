import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Articles from "@/components/templates/Index/Articles/Articles";
import Banner from "@/components/templates/Index/Banner/Banner";
import Latest from "@/components/templates/Index/Latest/Latest";
import Promote from "@/components/templates/Index/Promote/Promote";
import { cookies } from "next/headers";
import { authUser } from "@/utils/auth";

export default async function Home() {
  const token = cookies().get("token");
  const user = await authUser(token || "");
  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Banner />
      <Latest />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
