import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UTeM Bus Tracker Dashboard",
  description: "Real-time bus tracking application for UTeM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
        {/* Optional: Add a Footer component here later */}
      </body>
    </html>
  );
}
