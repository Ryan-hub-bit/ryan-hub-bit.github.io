import type { Metadata } from "next";
import "./globals.css";

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kun Liu",
  alternateName: ["Kun Liu Academic Homepage", "刘坤"],
  url: "https://ryan-hub-bit.github.io/",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ryan-hub-bit.github.io"),
  title: "Kun Liu\u2003|\u2003Welcome!",
  applicationName: "Kun Liu",
  description: "Research, publications, news, and academic service of Kun Liu.",
  alternates: { canonical: "/" },
  icons: {
    icon: { url: "/portrait-icon.png", type: "image/png", sizes: "96x96" },
  },
  openGraph: {
    type: "website",
    siteName: "Kun Liu",
    url: "/",
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
