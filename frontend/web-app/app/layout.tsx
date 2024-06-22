import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./nav/Navbar";
import ToasterProvider from "./providers/ToasterProvider";
import SignalRProvider from "./providers/SignalRProvider";

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
        <ToasterProvider />
        <Navbar />
        <main className="container-fluid max-w-[1200px] mx-auto px-5 pt-10">
          <SignalRProvider>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}
