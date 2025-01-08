import type { Metadata } from "next";
import "./main.css";

export const metadata: Metadata = {
  title: "Time Target",
  description: "Your personal countdown timer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
