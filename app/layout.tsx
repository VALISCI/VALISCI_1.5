import "./globals.css"

export const metadata = {
  metadataBase: new URL("https://valisci.com"),
  title: "VALISCI — Precision through Discernment",
  description: "VALISCI enables confident decisions in complex environments.",
  openGraph: { title: "VALISCI — Precision through Discernment", description: "VALISCI enables confident decisions in complex environments.", images: ["/og.png"] },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-[#0A0A0A] antialiased">{children}</body>
    </html>
  );
}
