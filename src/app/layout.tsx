import type { Metadata } from "next";
import { Poppins as PoppinsFont, Oswald as OswaldFont } from "next/font/google";
import "./globals.css";

const poppins = PoppinsFont({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const oswald = OswaldFont({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Wildish&Co - Digital Intelligence",
  description: "Next generation experience for the modern web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${oswald.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
