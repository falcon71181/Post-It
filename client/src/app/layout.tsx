import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthContextProvider } from "@/contexts/auth";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/foot/Footer";
import { Background } from "@/components/theme/BackgroundGrid";
import { Caveat } from 'next/font/google'
import { cn } from "../lib/utils";
import "./globals.css";


export const metadata: Metadata = {
  title: "Post-It",
  description: "Community driven forum",
};

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-caveat',
  display: 'swap'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "font-sans antialiased scroll-smooth bg-background", caveat.variable)}>
        <div className="min-h-screen w-full sm:w-10/12 md:w-9/12 mx-auto flex flex-col transition-all duration-200">
          <ThemeProvider
            enableSystem
            defaultTheme="system"
            attribute="class"
          >
            <AuthContextProvider>
              <NavBar />
              <div className="grow relative">{children}</div>
              <div className='border border-[#242F2B] mb-2'></div>
              <Footer />
            </AuthContextProvider>
            <Background />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
