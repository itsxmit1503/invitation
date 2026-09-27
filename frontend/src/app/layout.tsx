import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-serif-accent",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Faculty Invitation | Freshers' Welcome 2026",
  description: "A personalized, cinematic invitation experience for distinguished faculty members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#08080A] text-[#FDFBF7] font-sans selection:bg-[#D4AF37]/20 selection:text-[#F6E3B4] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
