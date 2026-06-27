import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevOps Platform — Ship Faster. Break Less. Own Your Infrastructure.",
  description:
    "Integrated CI/CD, monitoring, and infrastructure platform for modern engineering teams. Get started free.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  openGraph: {
    title: "DevOps Platform",
    description:
      "Integrated CI/CD, monitoring, and infrastructure for modern teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-[#0a0a0a] text-[#fafafa] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
