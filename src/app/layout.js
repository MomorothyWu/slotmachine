import "./globals.css";

import { Petit_Formal_Script } from 'next/font/google';

const petit = Petit_Formal_Script({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'slot machine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className={petit.className}>
        {children}
      </body>
    </html>
  );
}