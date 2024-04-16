import AosInit from "@/utils/aos";
import "./globals.css";
import { Inter } from "next/font/google";
import ScrollToTop from "@/utils/ScrolltoTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "صفحه اصلی - Set Coffee | فروشگاه اینترنتی قهوه",
  description: "Coffee Project with Next js",
  icons: {
    icon: "https://set-coffee.com/wp-content/uploads/2022/03/cropped-512x5122-1-192x192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        <AosInit />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
