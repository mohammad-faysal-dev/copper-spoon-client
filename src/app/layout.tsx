import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/providers/cart-provider";

const outfitBody = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

const outfitDisplay = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Copper Spoon",
  description: "Copper Spoon - Premium Restaurant",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfitBody.variable} ${outfitDisplay.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <CartProvider>
            {children}
          </CartProvider>

          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
