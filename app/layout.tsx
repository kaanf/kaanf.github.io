import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import Footer from "@/components/Footer";
import "./landing.css";
import "@/components/footer.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  fallback: ["system-ui", "sans-serif"],
});
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["system-ui", "sans-serif"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://crewishere.com"),
  title: "Crew — Come alone. Play the room.",
  description:
    "Crew turns a room full of strangers into a night worth remembering. Come alone. Play the room.",
  icons: { icon: "/img/icon.png", apple: "/img/icon-180.png" },
  openGraph: {
    type: "website",
    title: "Crew — Come alone. Play the room.",
    description:
      "Crew turns a room full of strangers into a night worth remembering.",
    images: ["/img/icon.png"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
