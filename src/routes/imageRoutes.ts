import { Router, Request, Response } from 'express';
import { ImageProcessor } from '../utils/imageProcessor';
import { validateImageParams } from '../middleware/validation';

const router = Router();
const imageProcessor = new ImageProcessor();

// GET /api/images - List available images
router.get('/', (req: Request, res: Response) => {
  try {
    const availableImages = imageProcessor.getAvailableImages();
    res.json({
      success: true,
      images: availableImages,
      message: `Found ${availableImages.length} available images`
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve available images'
    });
  }
});

// GET /api/images/resize - Resize an image
router.get('/resize', validateImageParams, async (req: Request, res: Response) => {
  try {
    const { filename, width, height } = (req as Request & { validatedParams: { filename: string; width: number; height: number } }).validatedParams;

    const result = await imageProcessor.processImage({
      filename,
      width,
      height
    });

    if (result.success && result.outputPath) {
      // Send the processed image
      res.sendFile(result.outputPath, { root: process.cwd() });
    } else {
      res.status(400).json({
        success: false,
        error: result.error || 'Failed to process image'
      });
    }
  } catch (error) {
    console.error('Error in resize endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export { router as imageRoutes };
