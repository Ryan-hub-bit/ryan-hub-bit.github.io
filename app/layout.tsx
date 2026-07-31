import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ryan-hub-bit.github.io"),
  title: "Kun Liu — Academic Homepage",
  description: "Research, publications, news, and academic service of Kun Liu.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Kun Liu — Academic Homepage",
    description: "Research, publications, news, and academic service of Kun Liu.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Kun Liu Academic Homepage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kun Liu — Academic Homepage",
    description: "Research, publications, news, and academic service of Kun Liu.",
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
