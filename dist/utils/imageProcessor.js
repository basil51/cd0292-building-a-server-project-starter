"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessor = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ImageProcessor {
    constructor(inputDir = 'images', outputDir = 'images/thumb') {
        this.inputDir = inputDir;
        this.outputDir = outputDir;
        this.ensureOutputDirectory();
    }
    ensureOutputDirectory() {
        if (!fs_1.default.existsSync(this.outputDir)) {
            fs_1.default.mkdirSync(this.outputDir, { recursive: true });
        }
    }
    getInputPath(filename) {
        return path_1.default.join(this.inputDir, filename);
    }
    getOutputPath(filename, width, height) {
        const nameWithoutExt = path_1.default.parse(filename).name;
        const outputFilename = `${nameWithoutExt}_${width}x${height}.jpg`;
        return path_1.default.join(this.outputDir, outputFilename);
    }
    isValidImage(filename) {
        const validExtensions = ['.jpg', '.jpeg'];
        const ext = path_1.default.extname(filename).toLowerCase();
        return validExtensions.includes(ext);
    }
    imageExists(inputPath) {
        return fs_1.default.existsSync(inputPath);
    }
    processedImageExists(outputPath) {
        return fs_1.default.existsSync(outputPath);
    }
    async processImage(options) {
        const { width, height, filename } = options;
        try {
            if (!filename) {
                return { success: false, error: 'Filename is required' };
            }
            if (!this.isValidImage(filename)) {
                return { success: false, error: 'Only JPG images are supported' };
            }
            if (width <= 0 || height <= 0) {
                return { success: false, error: 'Width and height must be positive numbers' };
            }
            const inputPath = this.getInputPath(filename);
            const outputPath = this.getOutputPath(filename, width, height);
            if (!this.imageExists(inputPath)) {
                return { success: false, error: `Image '${filename}' not found` };
            }
            if (this.processedImageExists(outputPath)) {
                return { success: true, outputPath };
            }
            await (0, sharp_1.default)(inputPath)
                .resize(width, height, {
                fit: 'cover',
                position: 'center'
            })
                .jpeg({ quality: 90 })
                .toFile(outputPath);
            return { success: true, outputPath };
        }
        catch (error) {
            console.error('Error processing image:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    getAvailableImages() {
        try {
            if (!fs_1.default.existsSync(this.inputDir)) {
                return [];
            }
            return fs_1.default.readdirSync(this.inputDir)
                .filter(file => this.isValidImage(file));
        }
        catch (error) {
            console.error('Error reading images directory:', error);
            return [];
        }
    }
}
exports.ImageProcessor = ImageProcessor;
//# sourceMappingURL=imageProcessor.js.map