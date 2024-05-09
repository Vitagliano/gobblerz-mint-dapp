import type {Metadata} from "next";
import {JetBrains_Mono, Mohave} from "next/font/google";
import "./globals.css";

import '@rainbow-me/rainbowkit/styles.css';
import {Providers} from './providers';
import {Toaster} from "@/components/ui/toaster";

const mohave = Mohave({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-mohave",
});

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-jetbrains",
});

export const metadata: Metadata = {
    title: "Spotlight404",
    description: "The Gobblerz collection resembles an exquisite art gallery showcasing the talent of over 30 accomplished artists on the Avalanche platform. Discover your favorite artists among our collaborative works, featuring a stunning array of unique 1/1 creations!",
    openGraph: {
        type: 'website',
        url: 'https://mint.thegangdao.xyz/',
        title: 'Gobblerz - The Gang DAO',
        description: 'The Gobblerz collection resembles an exquisite art gallery showcasing the talent of over 30 accomplished artists on the Avalanche platform. Discover your favorite artists among our collaborative works, featuring a stunning array of unique 1/1 creations!',
        images: [
            {
                url: 'https://i.imgur.com/54BZ4ff.png',
                width: 1200,
                height: 630,
                alt: 'Gobblerz - The Gang DAO',
            }
        ]
    },
    twitter: {
        card: 'summary',
        site: '@TheGangDAOo',
        title: 'Gobblerz - The Gang DAO',
        description: 'The Gobblerz collection resembles an exquisite art gallery showcasing the talent of over 30 accomplished artists on the Avalanche platform. Discover your favorite artists among our collaborative works, featuring a stunning array of unique 1/1 creations!',
        images: 'https://i.imgur.com/54BZ4ff.png'
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${jetbrains.className} ${mohave.className}`}>
        <Providers>
            {children}
            <Toaster/>
        </Providers>
        </body>
        </html>
    );
}
