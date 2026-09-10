import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BudgetBuddy — Personal finance, made clear",
  description: "Track spending, plan budgets, grow savings goals, and understand your finances with simple AI-powered insights.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
