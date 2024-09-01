import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "react-hot-toast";
import { LayoutProvider } from "@/context/layoutContext";
import { AuthContainer } from "@/components/authContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WealthWave",
  description: "We save together, we grow together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <LayoutProvider>
        <html lang="en">
          <body className={`${inter.className} layout-wrapper`} suppressHydrationWarning={true} >
            <Toaster position="top-center" />
            <ConvexClientProvider>
              {/* <Navbar /> */}
              <ThemeProvider>{children}</ThemeProvider>
              {/* <Footer /> */}
            </ConvexClientProvider>
          </body>
        </html>
        <AuthContainer />
      </LayoutProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
