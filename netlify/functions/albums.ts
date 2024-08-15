
import { Handler } from '@netlify/functions'
import { Storage } from '../../server/storage/storage.ts';
import { Album } from '../../server/types/index.ts';

const store = new Storage();

const handler: Handler = async (event) => {
  await store.init();

  const { columns: colString } = event.queryStringParameters as { columns: string };
  const colummnNames = colString.split(',');

  const relevant = store.albums.map((album: Album): Partial<Album> => {
    const data = {};

    for (const header of colummnNames) {
      data[header] = album[header];
    }

    return data;
  });

  return {
    statusCode: 200,
    body: JSON.stringify(relevant)
  }
}

export { handler }
