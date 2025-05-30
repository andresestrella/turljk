import clientPromise from '@/lib/mongodb';

export type RedirectProps = {
  url: string;
  videoUrl: string;
  code?: string;
  seconds: number;
  lastVisit: Date;
};

export interface ResultProps {
  _id: string;
  redirects: RedirectProps[];
}

const ytVidIdRegexp = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;

export async function getRedirect(code: string): Promise<RedirectProps | null> {
  const client = await clientPromise;
  const collection = client.db('turl-db').collection('redirects');

  const updateResult = async () => {
    await collection
      .updateOne(
        { code },
        {
          $set: {
            lastVisit: new Date()
          }
        }
      )
      .catch((error) => {
        console.error('error', error);
      });
  };

  const result = await collection.findOne({ code }).catch((error) => {
    console.error(error);
  });
  if (result) {
    const today = new Date();
    if (result.lastVisit.getDate() !== today.getDate()) {
      await updateResult();
    }

    return {
      url: result.url,
      videoUrl: result.videoUrl,
      code: result.code,
      lastVisit: result.lastVisit,
      seconds: result.seconds
    };
  } else return null;
}

export async function createRedirect(
  redirect: RedirectProps
): Promise<string | null> {
  // validate YouTube video URL
  const videoId = redirect.videoUrl.match(ytVidIdRegexp)?.[1];

  if (!videoId) {
    alert('Invalid YouTube video URL');
    return null;
  }

  const client = await clientPromise;
  const collection = client.db('turl-db').collection('redirects');

  const newRedirect = await collection.insertOne(redirect);
  const insertedId = newRedirect.insertedId;
  const code = insertedId.toString().slice(-6);

  const update = await collection.updateOne(
    { _id: insertedId },
    { $set: { code } }
  );

  if (newRedirect.acknowledged && update.acknowledged) {
    return code;
  } else return null;
}
