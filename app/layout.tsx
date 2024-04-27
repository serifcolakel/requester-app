"use client";

import { createStore, Provider } from "jotai";
import { DevTools } from "jotai-devtools";
import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

const customStore = createStore();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={customStore}>
          <DevTools store={customStore} />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
