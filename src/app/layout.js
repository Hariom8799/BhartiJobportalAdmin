import "./globals.css";
import ThemeProvider from "@/Context/ThemeContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Bharti Job Portal - Admin",
  description: "Admin Dashboard for Bharti Job Portal Uttarakhand",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
