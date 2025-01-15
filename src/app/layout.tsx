import './globals.css';
import { AuthProvider } from '@/features/auth/contexts/AuthContext';

export const metadata = {
  title: 'Game Performance',
  description: 'Game Performance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
