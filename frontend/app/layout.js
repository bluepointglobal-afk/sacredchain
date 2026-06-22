import './globals.css';
import { Plus_Jakarta_Sans, Amiri } from 'next/font/google';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/Toast';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata = {
  title: 'Sacred Knowledge — Learn with trusted Islamic teachers',
  description:
    'A Preply-style marketplace connecting learners with vetted teachers of Quran, Hadith, Arabic and the Islamic sciences. Plus SacredChain — Shariah advisory for business.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${amiri.variable}`}>
      <body>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
