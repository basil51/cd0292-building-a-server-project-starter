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
export declare class ImageProcessor {
    private readonly inputDir;
    private readonly outputDir;
    constructor(inputDir?: string, outputDir?: string);
    private ensureOutputDirectory;
    private getInputPath;
    private getOutputPath;
    private isValidImage;
    private imageExists;
    private processedImageExists;
    processImage(options: ImageProcessingOptions): Promise<ProcessedImageResult>;
    getAvailableImages(): string[];
}
//# sourceMappingURL=imageProcessor.d.ts.map