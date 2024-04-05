import Header from "@/components/Header";
import {authOptions} from "@/libs/authOptions";
import type { Metadata } from "next";
import {getServerSession} from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace",
  description: "My cool marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}
