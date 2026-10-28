import type { Metadata } from "next";
import HomeContent from "../home-content";

export const metadata: Metadata = {
  title: "刘坤\u2003|\u2003欢迎！",
  description: "刘坤的学术主页：研究方向、学术论文、最新动态、教学与学术服务。",
  alternates: {
    canonical: "/zh/",
    languages: { en: "/", "zh-CN": "/zh/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Kun Liu",
    url: "/zh/",
    locale: "zh_CN",
    alternateLocale: "en_US",
    title: "刘坤 — 学术主页",
    description: "刘坤的研究方向、学术论文、最新动态、教学与学术服务。",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "刘坤的学术主页" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "刘坤 — 学术主页",
    description: "刘坤的研究方向、学术论文、最新动态、教学与学术服务。",
    images: ["/og.png"],
  },
};

export default function ChineseHome() {
  return <HomeContent language="zh" />;
}
