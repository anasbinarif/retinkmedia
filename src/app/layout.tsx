import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "~/features/navbar/Navbar";
import React from "react";

export const metadata: Metadata = {
  title: "Retink Media",
  description: "Retink Media - Generate creative images and Instagram-ready content with prompts.",
  icons: [{ rel: "icon", url: "/implement.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
