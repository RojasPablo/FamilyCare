import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen scroll-smooth bg-[var(--moonlight-bg)]">

        {/* Navbar over the hero */}
        <div className="relative z-50">
          <Navbar />
        </div>
          {children}
        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
