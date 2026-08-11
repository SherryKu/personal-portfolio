import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sherryku.github.io/personal-portfolio/"),
  title: "Kexun (Sherry) Liu — AI Product Engineer",
  description:
    "AI Product Engineer working across product, design, engineering, and applied AI to turn complex workflows into intelligent products.",
  keywords: [
    "AI Product Engineer",
    "Product Engineer",
    "Design Engineer",
    "Applied AI",
    "Full-Stack Engineer",
    "Kexun Liu",
    "Sherry Liu",
  ],
  authors: [{ name: "Kexun (Sherry) Liu" }],
  openGraph: {
    title: "Kexun (Sherry) Liu — AI Product Engineer",
    description: "I turn complex workflows into intelligent products.",
    type: "website",
    url: "https://sherryku.github.io/personal-portfolio/",
    images: [{ url: "og.png", width: 1728, height: 900, alt: "Kexun (Sherry) Liu — AI Product Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kexun (Sherry) Liu — AI Product Engineer",
    description: "I turn complex workflows into intelligent products.",
    images: ["og.png"],
  },
  icons: {
    icon: "favicon.svg",
    shortcut: "favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
