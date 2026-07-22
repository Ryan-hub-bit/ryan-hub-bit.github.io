import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ryan-hub-bit.github.io"),
  title: "Ryan — Academic Homepage",
  description: "Research, publications, news, and academic service of Ryan.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ryan — Academic Homepage",
    description: "Research, publications, news, and academic service of Ryan.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Ryan Academic Homepage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan — Academic Homepage",
    description: "Research, publications, news, and academic service of Ryan.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
