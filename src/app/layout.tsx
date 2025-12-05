import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {

  title: "Hari Preetham - Portfolio",
  description: "Hari Preetham Portfolio",
    icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Zilla Slab and Nunito Sans from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Zilla+Slab:400,700|Nunito+Sans:400,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
