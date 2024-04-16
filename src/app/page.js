import Navbar from "@/components/modules/Navbar/Navbar";
import Banner from "@/components/templates/Index/Banner/Banner";
import Latest from "@/components/templates/Index/Latest/Latest";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Latest />
    </>
  );
}
