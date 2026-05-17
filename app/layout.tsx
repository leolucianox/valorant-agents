import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIVE — Visual Archive",
  description: "A curated collection of fashion, portraiture, and visual research.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --font-cormorant: "Cormorant Garamond", "Garamond", "Georgia", serif;
            --font-mono: "Space Mono", "Courier New", monospace;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
