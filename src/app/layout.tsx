import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sakbhaji",
  description: "Book a session with us",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
