type ImageKitLoaderParams = {
    src: string;
    width: number;
    quality?: number;
  };

  type ImageKitLoaderResult = string;

const imageKitLoader = ({ src, width, quality }: ImageKitLoaderParams): ImageKitLoaderResult => {
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(',');
  const urlEndpoint = 'https://ik.imagekit.io/bigreghunt';
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

export default imageKitLoader;
