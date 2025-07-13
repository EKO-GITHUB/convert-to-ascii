import type { Metadata } from "next";

export const home_page_metadata: Metadata = {
  title: "Convert 2 ASCII - Free Image to ASCII Art Converter Online",
  description:
    "Transform your images into stunning ASCII art with our free online converter. 100% client-side processing ensures privacy. Support for color ASCII, multiple character sets, and instant export. No upload limits or registration required.",
  keywords: [
    "ASCII art converter",
    "image to text art",
    "ASCII generator",
    "text art creator",
    "client-side image processing",
    "privacy-focused converter",
    "free ASCII tool",
    "online ASCII art",
    "character art",
    "monospace art",
    "terminal art",
    "pixel to text",
  ],
  authors: [{ name: "Murad Tochiev", url: "https://github.com/EKO-GITHUB" }],
  creator: "Murad Tochiev",
  publisher: "Convert 2 ASCII",

  openGraph: {
    title: "Convert 2 ASCII - Free Image to ASCII Art Converter",
    description:
      "Transform images into ASCII art with 100% client-side processing. Free, private, and instant results.",
    type: "website",
    siteName: "Convert 2 ASCII",
    locale: "en_US",
    url: "https://convert2ascii.com",
    images: [
      {
        url: "https://convert2ascii.com/icon-og.png",
        width: 1200,
        height: 630,
        alt: "Convert 2 ASCII - Image to ASCII Art Converter",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Convert 2 ASCII - Free Image to ASCII Art Converter",
    description:
      "Transform images into ASCII art with 100% client-side processing. Free, private, and instant results.",
    images: ["https://convert2ascii.com/icon-og.png"],
  },

  category: "Web Tools",
  classification: "Image Processing Tool",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://convert2ascii.com",
    languages: {
      "en-US": "https://convert2ascii.com",
    },
  },

  other: {
    "application-name": "Convert 2 ASCII",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};
