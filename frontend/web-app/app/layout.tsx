import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
