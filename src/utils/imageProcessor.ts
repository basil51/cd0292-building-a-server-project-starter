import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export interface ImageProcessingOptions {
  width: number;
  height: number;
  filename: string;
}

export interface ProcessedImageResult {
  success: boolean;
  outputPath?: string;
  error?: string;
}

export class ImageProcessor {
  private readonly inputDir: string;
  private readonly outputDir: string;

  constructor(inputDir: string = 'images', outputDir: string = 'images/thumb') {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
    this.ensureOutputDirectory();
  }

  private ensureOutputDirectory(): void {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  private getInputPath(filename: string): string {
    return path.join(this.inputDir, filename);
  }

  private getOutputPath(filename: string, width: number, height: number): string {
    const nameWithoutExt = path.parse(filename).name;
    const outputFilename = `${nameWithoutExt}_${width}x${height}.jpg`;
    return path.join(this.outputDir, outputFilename);
  }

  private isValidImage(filename: string): boolean {
    const validExtensions = ['.jpg', '.jpeg'];
    const ext = path.extname(filename).toLowerCase();
    return validExtensions.includes(ext);
  }

  private imageExists(inputPath: string): boolean {
    return fs.existsSync(inputPath);
  }

  private processedImageExists(outputPath: string): boolean {
    return fs.existsSync(outputPath);
  }

  async processImage(options: ImageProcessingOptions): Promise<ProcessedImageResult> {
    const { width, height, filename } = options;

    try {
      // Validate filename
      if (!filename) {
        return { success: false, error: 'Filename is required' };
      }

      // Validate image format
      if (!this.isValidImage(filename)) {
        return { success: false, error: 'Only JPG images are supported' };
      }

      // Validate dimensions
      if (width <= 0 || height <= 0) {
        return { success: false, error: 'Width and height must be positive numbers' };
      }

      const inputPath = this.getInputPath(filename);
      const outputPath = this.getOutputPath(filename, width, height);

      // Check if input image exists
      if (!this.imageExists(inputPath)) {
        return { success: false, error: `Image '${filename}' not found` };
      }

      // Check if processed image already exists (caching)
      if (this.processedImageExists(outputPath)) {
        return { success: true, outputPath };
      }

      // Process the image
      await sharp(inputPath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      return { success: true, outputPath };
    } catch (error) {
      console.error('Error processing image:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  getAvailableImages(): string[] {
    try {
      if (!fs.existsSync(this.inputDir)) {
        return [];
      }
      
      return fs.readdirSync(this.inputDir)
        .filter(file => this.isValidImage(file));
    } catch (error) {
      console.error('Error reading images directory:', error);
      return [];
    }
  }
}
