import '../styles/globals.css';
import Layout from '../components/Layout';

export const metadata = {
  title: 'ROOHI — Not Found in the Sky',
  description: 'A poetic 3D interactive experience'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600&family=Playfair+Display:wght@400;700&family=Noto+Sans+Urdu:wght@400;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
