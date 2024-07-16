import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChesspPro",
  description: "A modern chess platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col justify-between"}>
        <NextTopLoader showSpinner={false} color="#eab308" />
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
