import './globals.css';
import { Plus_Jakarta_Sans, Sora, Amiri, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/Toast';

// Body / UI text
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

// Display headlines — strong geometric grotesque (Preply-grade weight, dignified)
const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

// Arabic UI glyphs (teacher names, labels) — never let Arabic fall back to Latin
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

// Reverent serif reserved for du'a / Qur'anic verses only
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata = {
  title: 'Sacred Knowledge — Learn with trusted Islamic teachers',
  description:
    'A marketplace connecting learners with vetted teachers of Quran, Hadith, Arabic and the Islamic sciences. Plus SacredChain — Shariah advisory for business.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${sora.variable} ${plexArabic.variable} ${amiri.variable}`}>
      <body>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
