import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import env, { featureFlags } from '../config/env.js';

const client = featureFlags.s3
  ? new S3Client({
      region: env.awsRegion,
      credentials: { accessKeyId: env.awsAccessKeyId, secretAccessKey: env.awsSecretAccessKey },
    })
  : null;

export const s3Enabled = () => Boolean(client);

/**
 * Create a presigned PUT URL the browser can upload to directly.
 * Returns { uploadUrl, fileUrl, key }.
 */
export async function presignUpload({ folder = 'uploads', filename, contentType }) {
  if (!client) throw Object.assign(new Error('File storage is not configured'), { status: 503 });
  const ext = (filename || '').split('.').pop()?.slice(0, 10) || 'bin';
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;
  const cmd = new PutObjectCommand({ Bucket: env.s3Bucket, Key: key, ContentType: contentType });
  const uploadUrl = await getSignedUrl(client, cmd, { expiresIn: 300 });
  const fileUrl = `https://${env.s3Bucket}.s3.${env.awsRegion}.amazonaws.com/${key}`;
  return { uploadUrl, fileUrl, key };
}
