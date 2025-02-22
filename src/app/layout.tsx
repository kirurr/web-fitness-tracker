import type { Metadata } from "next";
import { Sora, Open_Sans } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Fitness Tracker",
  description: "Track your calories intake, calories burnt, and water intake in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${openSans.variable} flex min-h-screen w-full flex-col antialiased`}
      >
        <header>
          <Navbar />
        </header>
        <main className="mx-auto relative h-full w-full max-w-screen-lg grow px-2 py-8 lg:px-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
