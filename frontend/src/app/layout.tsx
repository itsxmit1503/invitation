import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VYBE'26 | Freshers' Welcome 2026",
  description: "Special Invitation for VYBE'26 - Freshers' Welcome 2026, Conducted by BCA III Semester.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jakarta.variable} h-full overflow-hidden antialiased`}
    >
      <body className="h-full w-full bg-[#FFF2EF] text-[#0B2042] font-sans selection:bg-[#2F75C7]/20 selection:text-[#0B2042] overflow-hidden">
        {children}
      </body>
    </html>
  );
}
