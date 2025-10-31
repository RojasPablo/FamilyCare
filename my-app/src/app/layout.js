// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen scroll-smooth">
        <div className="relative flex min-h-screen flex-col">
          <div className="relative z-50">
            <Navbar />
          </div>

          <main className="relative z-10 flex-1">
            {children}
          </main>

          <div className="relative z-40">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}