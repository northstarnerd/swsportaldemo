import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suburban Waste Services | Customer Portal",
  description: "Manage your waste, recycling, organics schedule and instant payments with SWS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] flex flex-col">{children}</body>
    </html>
  );
}
