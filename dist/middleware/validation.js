"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageParams = void 0;
const validateImageParams = (req, res, next) => {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        res.status(400).json({
            success: false,
            error: 'Missing required parameters. Please provide filename, width, and height.'
        });
        return;
    }
    if (typeof filename !== 'string' || filename.trim() === '') {
        res.status(400).json({
            success: false,
            error: 'Filename must be a non-empty string'
        });
        return;
    }
    const widthStr = String(width);
    const widthNum = parseInt(widthStr);
    if (isNaN(widthNum) || widthNum <= 0) {
        res.status(400).json({
            success: false,
            error: 'Width must be a positive number'
        });
        return;
    }
    const heightStr = String(height);
    const heightNum = parseInt(heightStr);
    if (isNaN(heightNum) || heightNum <= 0) {
        res.status(400).json({
            success: false,
            error: 'Height must be a positive number'
        });
        return;
    }
    req.validatedParams = {
        filename: filename.trim(),
        width: widthNum,
        height: heightNum
    };
    next();
};
exports.validateImageParams = validateImageParams;
//# sourceMappingURL=validation.js.map