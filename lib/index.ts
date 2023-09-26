import { join } from "path";

export const nameLogo = "MonaLisa";

export const cardPerPage = 3;

export const timeStampDuration = 30000;// 30 seconds

export const publicUploadsDir = (dir: string, file: string) => join(
  process.env.ROOT_DIR || process.cwd(),
  `public/uploads/${dir}/${file}`
);

export const APIKEY = "NFHJNCKSMKCMFDJCKMCFKDJCFNDJFHCBDJGNKJDMCKGVNJMVDKMVGJVNK"