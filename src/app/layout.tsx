import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "./fonts/fonts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Provider from "../../context/Provider";


export const metadata: Metadata = {
  title: "Blog y Post Real Time",
  description: "Crean increibles Post",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={manrope.className}
      >
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
