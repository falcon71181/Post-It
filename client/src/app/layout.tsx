import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NavBar from "@/components/nav/NavBar";
import { Background } from "@/components/theme/BackgroundGrid";
import { Caveat } from 'next/font/google'
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
      <body className="font-sans antialiased scroll-smooth bg-background">
        <div className="min-h-screen w-full sm:w-10/12 md:w-9/12 mx-auto flex flex-col transition-all duration-500">
          <ThemeProvider
            enableSystem
            defaultTheme="system"
            attribute="class"
          >
            <NavBar />
            <div className="flex-grow">{children}</div>
            <Background />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
