import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hari Preetham - Robotics Researcher",
  description: "Robotics researcher portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
