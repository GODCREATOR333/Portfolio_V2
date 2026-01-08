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
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "uybuxlarrm");
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}