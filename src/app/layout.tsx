import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'WISE English Academy - Premier Islamic Learning Platform',
    template: '%s | WISE English Academy'
  },
  description: 'Master Islamic jurisprudence and Islamic sciences with world-class education. Free courses on Maliki, Hanafi, Shafi\'i, and Hanbali schools of thought. Expert instructors, comprehensive curriculum.',
  keywords: [
    'Islamic learning',
    'Islamic jurisprudence',
    'Islamic courses',
    'Maliki school',
    'Hanafi school',
    'Shafi\'i school',
    'Hanbali school',
    'Islamic education',
    'Fiqh',
    'Islamic law',
    'Online Islamic courses',
    'Free Islamic education',
    'Islamic sciences',
    'Islamic studies',
    'Quran studies',
    'Hadith studies',
    'Islamic theology',
    'Aqidah',
    'Islamic history',
    'Arabic language',
    'Islamic jurisprudence schools',
    'Madhhab',
    'Islamic scholarship',
    'Islamic knowledge',
    'Muslim education',
    'Islamic curriculum',
    'Islamic teachers',
    'Islamic scholars',
    'Islamic academy',
    'Islamic institute'
  ],
  authors: [{ name: 'WISE English Academy', url: 'https://wiseenglishacademy.org' }],
  creator: 'WISE English Academy',
  publisher: 'WISE English Academy',
  applicationName: 'WISE English Academy',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wiseenglishacademy.org'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ar-SA': '/ar-SA',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wiseenglishacademy.org',
    siteName: 'WISE English Academy',
    title: 'WISE English Academy - Premier Islamic Learning Platform',
    description: 'Master Islamic jurisprudence and Islamic sciences with world-class education. Free courses on Maliki, Hanafi, Shafi\'i, and Hanbali schools of thought.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WISE English Academy - Premier Islamic Learning Platform',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'WISE English Academy Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@wiseenglishacademy',
    creator: '@wiseenglishacademy',
    title: 'WISE English Academy - Premier Islamic Learning Platform',
    description: 'Master Islamic jurisprudence and Islamic sciences with world-class education. Free courses on Maliki, Hanafi, Shafi\'i, and Hanbali schools of thought.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Education',
  classification: 'Islamic Education Platform',
  other: {
    'msapplication-TileColor': '#732121',
    'theme-color': '#732121',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#16a34a" />
        <script src="/fix-routing.js" defer></script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>{children}</main>
          
          {/* Footer */}
          <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-2xl font-bold text-primary-400 mb-4">
                    WISE English Academy
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Dedicated to providing free, high-quality Islamic education to students worldwide. 
                    Learn from qualified scholars and deepen your understanding of Islamic jurisprudence.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Learning Tracks</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><Link href="/tracks/maliki" className="hover:text-primary-400 transition-colors">Maliki</Link></li>
                    <li><Link href="/tracks/hanafi" className="hover:text-primary-400 transition-colors">Hanafi</Link></li>
                    <li><Link href="/tracks/shafi-i" className="hover:text-primary-400 transition-colors">Shafi&apos;i</Link></li>
                    <li><Link href="/tracks/hanbali" className="hover:text-primary-400 transition-colors">Hanbali</Link></li>
                    <li><Link href="/tracks/universal" className="hover:text-primary-400 transition-colors">Universal</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><Link href="/courses" className="hover:text-primary-400 transition-colors">All Courses</Link></li>
                    <li><Link href="/instructors" className="hover:text-primary-400 transition-colors">Instructors</Link></li>
                    <li><Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                    <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Wise English Academy. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}