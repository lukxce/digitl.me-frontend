import { Manrope } from "next/font/google";
import SiteNav from "./components/SiteNav";
import layoutStyles from "./layout.module.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Digitl",
    template: "%s · Digitl",
  },
  description: "Digitl frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <SiteNav />
        <div className={layoutStyles.shell}>{children}</div>
      </body>
    </html>
  );
}
