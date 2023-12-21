
const albumData = await (await fetch("/manifest.json")).json();

export function getAlbums() {
  const { domain, folders } = albumData;

  return Object.fromEntries(Object.entries(folders).map(([id, album]) => {
      const updatedImages = album.images.map((image) => {
        return {
          ...image,
          thumbnail_url: `${domain}${image.thumbnail_url}`,
          image_url: `${domain}${image.image_url}`,
        };
      });

      return [id, {
        ...album,
        images: updatedImages,
      }];
    }));
}
