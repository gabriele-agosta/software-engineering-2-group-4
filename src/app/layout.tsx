// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Software Engineering Project",
  description: "Queue Management System"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
