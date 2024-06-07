import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./nav/Navbar";

export const metadata: Metadata = {
  title: "Micro Muzayede",
  description: "Microservices PoC Client App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container-fluid mx-auto px-5 pt-10">{children}</main>
      </body>
    </html>
  );
}
