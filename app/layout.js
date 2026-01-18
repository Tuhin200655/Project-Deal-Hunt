import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "Deal Hunt",
  description: "Track online prices and get notified of drops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
