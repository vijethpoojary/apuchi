import type { Metadata } from "next";
import { Dancing_Script, Poppins } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "For Chinchu — With All My Love",
  description: "A love letter built just for you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dancingScript.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-full flex flex-col scroll-smooth">
        {children}
      </body>
    </html>
  );
}
