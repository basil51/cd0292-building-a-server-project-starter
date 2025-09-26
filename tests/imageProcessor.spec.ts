import { ImageProcessor } from '../src/utils/imageProcessor';
import fs from 'fs';
import path from 'path';

describe('ImageProcessor', () => {
  let imageProcessor: ImageProcessor;
  const testInputDir = 'images';
  const testOutputDir = 'images/thumb';

  beforeEach(() => {
    imageProcessor = new ImageProcessor(testInputDir, testOutputDir);
  });

  afterEach(() => {
    // Clean up test output files
    if (fs.existsSync(testOutputDir)) {
      const files = fs.readdirSync(testOutputDir);
      files.forEach(file => {
        if (file.includes('_test_')) {
          fs.unlinkSync(path.join(testOutputDir, file));
        }
      });
    }
  });

  describe('processImage', () => {
    it('should process a valid image successfully', async () => {
      const options = {
        filename: 'encenadaport.jpg',
        width: 200,
        height: 200
      };

      const result = await imageProcessor.processImage(options);

      expect(result.success).toBe(true);
      expect(result.outputPath).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should return error for missing filename', async () => {
      const options = {
        filename: '',
        width: 200,
        height: 200
      };

      const result = await imageProcessor.processImage(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Filename is required');
    });

    it('should return error for invalid image format', async () => {
      const options = {
        filename: 'test.png',
        width: 200,
        height: 200
      };

      const result = await imageProcessor.processImage(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Only JPG images are supported');
    });

    it('should return error for non-existent image', async () => {
      const options = {
        filename: 'nonexistent.jpg',
        width: 200,
        height: 200
      };

      const result = await imageProcessor.processImage(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Image 'nonexistent.jpg' not found");
    });

    it('should return error for invalid dimensions', async () => {
      const options = {
        filename: 'encenadaport.jpg',
        width: -100,
        height: 200
      };

      const result = await imageProcessor.processImage(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Width and height must be positive numbers');
    });

    it('should return error for zero dimensions', async () => {
      const options = {
        filename: 'encenadaport.jpg',
        width: 0,
        height: 200
      };

      const result = await imageProcessor.processImage(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Width and height must be positive numbers');
    });
  });

  describe('getAvailableImages', () => {
    it('should return list of available JPG images', () => {
      const images = imageProcessor.getAvailableImages();

      expect(Array.isArray(images)).toBe(true);
      expect(images.length).toBeGreaterThan(0);
      
      // Check that all returned files are JPG
      images.forEach(image => {
        expect(image.toLowerCase()).toMatch(/\.(jpg|jpeg)$/);
      });
    });

    it('should return empty array if images directory does not exist', () => {
      const processor = new ImageProcessor('nonexistent', 'output');
      const images = processor.getAvailableImages();

      expect(images).toEqual([]);
    });
  });

  describe('caching behavior', () => {
    it('should return existing processed image without reprocessing', async () => {
      const options = {
        filename: 'encenadaport.jpg',
        width: 300,
        height: 300
      };

      // First processing
      const result1 = await imageProcessor.processImage(options);
      expect(result1.success).toBe(true);

      // Second processing should return cached result
      const result2 = await imageProcessor.processImage(options);
      expect(result2.success).toBe(true);
      expect(result2.outputPath).toBe(result1.outputPath);
    });
  });
});
