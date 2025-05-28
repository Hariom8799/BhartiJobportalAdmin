import "./globals.css";
import ThemeProvider from "@/Context/ThemeContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Next Js Dashboard",
  description: "Next Js Dashboard Tutorial",
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
