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
                <div className="h-full max-w-5xl mx-auto">
                    <ThemeProvider
                        enableSystem
                        defaultTheme="system"
                        attribute="class"
                    >
                        <NavBar />
                        <div>{children}</div>
                        <Background />
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}
