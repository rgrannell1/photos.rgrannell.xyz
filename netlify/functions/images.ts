
import { Handler } from '@netlify/functions'
import { Storage } from '../../server/storage/storage.ts';
import { Image } from '../../server/types/index.ts';

const store = new Storage();

const handler: Handler = async (event) => {
  await store.init();
  const env = await store.getEnv();

  const { columns: colString } = event.queryStringParameters as { columns: string };
  const colummnNames = (colString ?? '').split(',');

  const relevant = store.images.map((image: Image): Partial<Image> => {
    const data = {};

    if (colString) {
      for (const header of colummnNames) {
        data[header] = image[header];
      }
    } else {
      return image;
    }

    return data;
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      publication_id: env.publication_id,
      data: Storage.toManifestFormat(relevant)
    })
  }
}

export { handler }
