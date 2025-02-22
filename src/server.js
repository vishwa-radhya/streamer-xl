import express from 'express';
import multer from 'multer';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

const app = express();
const PORT =  3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
  });
  const upload = multer({ storage });
  
  // Create directories if they don't exist
  if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
  if (!fs.existsSync('processed')) fs.mkdirSync('processed');
  
  // Endpoint for uploading a video
  app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
  
    // File path
    const inputPath = req.file.path;
    const outputDir = `processed/${Date.now()}`;
    fs.mkdirSync(outputDir);
  
    // Define the output path for the HLS manifest
    const outputPath = path.join(outputDir, 'output.m3u8');
  
    // FFmpeg command to convert the video into HLS format
    // This example creates a basic HLS stream with default settings.
    ffmpeg(inputPath)
      .outputOptions([
        '-profile:v baseline', // compatibility for mobile devices
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls',
      ])
      .output(outputPath)
      .on('end', () => {
        // Remove the uploaded file if no longer needed
        fs.unlinkSync(inputPath);
        // Respond with the HLS manifest URL (for this prototype, a local path)
        res.json({ hlsUrl: outputPath });
      })
      .on('error', (err) => {
        console.error('Error processing video:', err);
        res.status(500).send('Error processing video.');
      })
      .run();
  });
  
  // Basic route
  app.get('/', (req, res) => {
    res.send('Video Processing Server is running.');
  });

app.listen(PORT,()=>{
    console.log('Server is running on port ',PORT);
})
