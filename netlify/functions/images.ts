
import { Handler } from '@netlify/functions'
import { Storage } from '../../server/storage/storage.ts';
import { Image } from '../../server/types/index.ts';

const store = new Storage();

const handler: Handler = async (event) => {
  await store.init();

  const { columns: colString } = event.queryStringParameters as { columns: string };
  const colummnNames = colString.split(',');

  const relevant = store.images.map((image: Image): Partial<Image> => {
    const data = {};

    for (const header of colummnNames) {
      data[header] = image[header];
    }

    return data;
  });

  return {
    statusCode: 200,
    body: JSON.stringify(relevant)
  }
}

export { handler }
