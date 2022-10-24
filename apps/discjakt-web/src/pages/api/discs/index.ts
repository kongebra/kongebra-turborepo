import { Disc } from "@prisma/client";
import { prisma } from "src/common/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    case "POST":
      return await POST(req, res);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const discs = await prisma.disc.findMany({
    include: {
      brand: true,
      products: true,
    },
  });

  res.status(200).json(discs);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as Disc;

  // azure subscription is down :'(
  // body.imageUrl = await downloadAndUploadImage(body.imageUrl);

  const disc = await prisma.disc.create({
    data: {
      ...body,
    },
    include: {
      products: true,
    },
  });

  if (disc === null) {
    return res.status(500).json({ message: "internal server error" });
  }

  res.status(201).json(disc);
}

// const containerName = "uploads";
// const sasToken = process.env.NEXT_PUBLIC_STORAGESASTOKEN;
// const storageAccountName = process.env.NEXT_PUBLIC_STORAGERESOURCENAME;

// export const downloadAndUploadImage = async (url: string) => {
//   const response = await axios.get(url, {
//     responseType: "arraybuffer",
//   });
//   const buffer = Buffer.from(response.data, "utf-8");

//   const blobService = new BlobServiceClient(
//     `https://${storageAccountName}.blob.core.windows.net/${sasToken}`
//   );

//   const containerClient: ContainerClient =
//     blobService.getContainerClient(containerName);

//   const ext = url.split(".").pop();
//   const fileName = `${uuidv4()}.${ext}`;

//   const blobClient = containerClient.getBlockBlobClient(fileName);
//   const options = { blobHTTPHeaders: { blobContentType: `image/${ext}` } };

//   await blobClient.uploadData(buffer, options);

//   return `https://${storageAccountName}.blob.core.windows.net/uploads/${fileName}`;
// };
