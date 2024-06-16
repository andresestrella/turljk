import '../styles/globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Viewport } from 'next';
import { Cabin } from 'next/font/google';
import Script from 'next/script';
// import ClusterProvisioning from '@/components/layout/cluster-provisioning';
// import clientPromise from '@/lib/mongodb';

export const metadata: Metadata = {
  title: 'TURL',
  description:
    'TURL built with Next.js, Vercel, and MongoDB Atlas.',

  icons: {
    icon: '/favicon.ico',
    shortcut: {
      type: 'image/x-icon',
      url: '/favicon.ico'
    },
    apple: {
      sizes: '180x180',
      url: '/favicon.ico'
    }
  },
  openGraph: {
    title: 'TURL',
    type: 'website',
    description:
      'TURL built with Next.js, Vercel, and MongoDB Atlas.',
    url: 'https://mongodb.vercel.app'
  },
  other: {
    name: 'TURL',
    description:
      'TURL built with Next.js, Vercel, and MongoDB Atlas.',
    image:
      'https://assets.vercel.com/image/upload/v1654626375/twitter-cards/mongo-integration-starter.png'
  }
};

export const viewport: Viewport = {
  themeColor: '#7b46f6',
  width: 'device-width',
  initialScale: 1
};

const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabin'
});

export default function RootLayout({
  // clusterStillProvisioning,
  children
}: {
  // clusterStillProvisioning?: boolean;
  children: ReactNode;
}) {
  // let clusterStillProvisioning = false;

  // const fetchData = async () => {
  //   try {
  //     await clientPromise;
  //   } catch (e: any) {
  //     if (e.code === 'ENOTFOUND') {
  //       // Cluster still provisioning
  //       clusterStillProvisioning = true;
  //     } else {
  //       throw new Error(`Connection limit reached. Please try again later.`);
  //     }
  //   }
  // };
  // fetchData();

  // You should remove this once your MongoDB Cluster is fully provisioned
  // if (clusterStillProvisioning) {
  //   return <ClusterProvisioning />;
  // }

  return (
    <html lang="en">
      <head>
        {
          // <Script
          //   src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          //   async
          //   defer
          // ></Script>
        }
        {
          <Script
            src="https://www.youtube.com/iframe_api"
            async
            defer
          ></Script>
        }
      </head>
      <body className={cabin.variable}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
