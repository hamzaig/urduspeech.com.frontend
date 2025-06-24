import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "UrduSpeech - Professional Urdu Speech-to-Text & Translation Services",
  description:
    "Professional Urdu speech-to-text, translation, and language services. Contact us for high-quality Urdu language solutions.",
  keywords:
    "Urdu speech to text, Urdu translation, Urdu language services, Urdu transcription",
  authors: [{ name: "UrduSpeech" }],
  openGraph: {
    title:
      "UrduSpeech - Professional Urdu Speech-to-Text & Translation Services",
    description:
      "Professional Urdu speech-to-text, translation, and language services. Contact us for high-quality Urdu language solutions.",
    url: "https://urduspeech.com",
    siteName: "UrduSpeech",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <GoogleAnalytics gaId="G-W9GLHNQCGG" />
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
