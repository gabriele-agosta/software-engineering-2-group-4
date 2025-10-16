import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ticket Queue",
  description: "Esempio Next.js con routing automatico",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Header o Navbar globale (opzionale) */}
        <div className="container my-4">
          {children}
        </div>
      </body>
    </html>
  );
}
