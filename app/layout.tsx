import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import AudioProvider from "@/providers/AudioProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PodText AI",
  description: "Generate podcasts using AI",
  icons: {
    icon: "/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
    <AudioProvider>
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
    </AudioProvider>
    </ConvexClerkProvider>
  );
}
