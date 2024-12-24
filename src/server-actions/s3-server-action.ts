/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getKindeUser } from "@/server-actions/user-server-action";
import { db } from "@/db";
import crypto from "crypto";
import { media } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { and, eq } from "drizzle-orm";




const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

type GetSignedURLParam = {
  fileType: string;
  fileSize: number;
  checksum: string;
};

type SignedURLResponse = Promise<
  { failure?: undefined; success: { url: string, mediaId: string } } |
  { failure: string; success?: undefined }
>;

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "video/mp4",
  "video/quicktime"
];

const maxFileSize = 1048576 * 10; // 10 MB

export async function generateSignedURL({fileSize, fileType, checksum}: GetSignedURLParam): SignedURLResponse {
  const session = await getKindeUser();
  try {
    if (!session) {
      throw new Error("User is not Found");
    }

    if (fileSize > maxFileSize) {
      throw new Error("File Size is Too Big");
    }

    if (!allowedFileTypes.includes(fileType)) {
      throw new Error("File Type not allowed");
    }

    const fileName = generateFileName();
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      ContentType: fileType,
      ContentLength: fileSize,
      ChecksumSHA256: checksum,
    });

    const url = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 60,
    });

    const permanentUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileName}`;

    const [mediaResult] = await db
      .insert(media)
      .values({
        id: uuidv4(),
        type: fileType,
        url: permanentUrl,
        userId: session.id,
        createdAt: new Date().toISOString(),
      })
      .returning({ id: media.id });

    return { success: { url, mediaId: mediaResult.id } };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return { failure: "Error generating signed URL" };
  }
}



