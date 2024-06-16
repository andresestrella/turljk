import Head from 'next/head';

export const defaultMetaProps = {
  title: 'MongoDB Starter Kit',
  description:
    'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
  ogImage: `https://assets.vercel.com/image/upload/v1654626375/twitter-cards/mongo-integration-starter.png`,
  ogUrl: 'https://mongodb.vercel.app'
};

export interface MetaProps {
  title: string;
  description: string;
  ogUrl: string;
  ogImage: string;
}

export default function Meta({ props }: { props: MetaProps }) {
  return (
    <Head>

      <meta charSet="utf-8" />

      <meta itemProp="name" content={props.title} />
      <meta itemProp="description" content={props.description} />
      <meta itemProp="image" content={props.ogImage} />
      <meta name="description" content={props.description} />

      <meta property="og:image" content={props.ogImage} />

      <title>{props.title}</title>

      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <meta name="theme-color" content="#7b46f6" />

      <meta property="og:title" content={props.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.ogUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
