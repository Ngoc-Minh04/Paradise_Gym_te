
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('--- Testing Actual Upload ---');

// Create a dummy 1x1 pixel PNG buffer
const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

try {
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      folder: 'test-folder',
      resource_type: 'image'
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });
  console.log('✅ Upload Successful:', result.secure_url);
} catch (err) {
  console.error('❌ Upload Failed:', err.message);
  console.error('Full Error:', err);
}
