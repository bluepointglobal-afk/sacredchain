import { asyncHandler } from '../middleware/error.js';
import { presignUpload, s3Enabled } from '../utils/s3.js';

// POST /api/uploads/presign  (auth) body: { filename, contentType, folder }
export const presign = asyncHandler(async (req, res) => {
  if (!s3Enabled()) return res.status(503).json({ error: 'File storage is not configured on this server' });
  const { filename, contentType, folder } = req.body;
  const result = await presignUpload({ folder: folder || 'uploads', filename, contentType });
  res.json(result);
});
