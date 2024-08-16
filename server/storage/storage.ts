import { Album, Image, Env } from "../types/index.ts";
import env from '../../manifest/env.json' assert { type: 'json' };
import { resolve } from 'path';

const root = resolve('.');

export class Storage {
  albums: Album[] = [];
  images: Image[] = [];

  async init() {
    const [albums, images] = await Promise.all([
      this.getAlbums(),
      this.getImages(),
    ]);

    this.albums = albums;
    this.images = images;
  }

  async getEnv(): Promise<Env> {
    return env;
  }

  async albumsPath() {
    const env = await this.getEnv();
    return `${root}/manifest/albums.${env.publication_id}.json`;
  }

  async imagesPath() {
    const env = await this.getEnv();
    return `${root}/manifest/images.${env.publication_id}.json`;
  }

  async getAlbums(): Promise<Album[]> {
    const path = await this.albumsPath();
    const module = await import(path, { assert: { type: 'json' }});

    const data = module.default;
    const [headers, ...rows] = data;

    return rows.map(row => {
      const data = { };
      for (let idx = 0; idx < row.length; idx++) {
        data[headers[idx]] = row[idx];
      }

      return data as Album;
    });
  }

  async getImages(): Promise<Image[]> {
    const path = await this.imagesPath();
    const module = await import(path, { assert: { type: 'json' }});

    const data = module.default;
    const [headers, ...rows] = data;

    return rows.map(row => {
      const data = { };
      for (let idx = 0; idx < row.length; idx++) {
        data[headers[idx]] = row[idx];
      }

      return data as Album;
    });
  }

  static toManifestFormat(rows: any[]) {
    const output: any[] = [];

    for (const row of rows) {
      if (output.length === 0) {
        output.push(Object.keys(row));
      }

      output.push(Object.values(row));
    }

    return output;
  }
}
