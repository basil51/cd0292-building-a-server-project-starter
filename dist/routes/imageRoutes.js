"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRoutes = void 0;
const express_1 = require("express");
const imageProcessor_1 = require("../utils/imageProcessor");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
exports.imageRoutes = router;
const imageProcessor = new imageProcessor_1.ImageProcessor();
router.get('/', (req, res) => {
    try {
        const availableImages = imageProcessor.getAvailableImages();
        res.json({
            success: true,
            images: availableImages,
            message: `Found ${availableImages.length} available images`
        });
    }
    catch {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve available images'
        });
    }
});
router.get('/resize', validation_1.validateImageParams, async (req, res) => {
    try {
        const { filename, width, height } = req.validatedParams;
        const result = await imageProcessor.processImage({
            filename,
            width,
            height
        });
        if (result.success && result.outputPath) {
            res.sendFile(result.outputPath, { root: process.cwd() });
        }
        else {
            res.status(400).json({
                success: false,
                error: result.error || 'Failed to process image'
            });
        }
    }
    catch (error) {
        console.error('Error in resize endpoint:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
//# sourceMappingURL=imageRoutes.js.map