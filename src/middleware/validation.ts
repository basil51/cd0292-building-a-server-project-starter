import { Request, Response, NextFunction } from 'express';

export interface ImageQueryParams {
  filename: string;
  width: string;
  height: string;
}

export const validateImageParams = (req: Request, res: Response, next: NextFunction): void => {
  const { filename, width, height } = req.query;

  // Check if all required parameters are present
  if (!filename || !width || !height) {
    res.status(400).json({
      success: false,
      error: 'Missing required parameters. Please provide filename, width, and height.'
    });
    return;
  }

  // Validate filename
  if (typeof filename !== 'string' || filename.trim() === '') {
    res.status(400).json({
      success: false,
      error: 'Filename must be a non-empty string'
    });
    return;
  }

  // Validate width
  const widthStr = String(width);
  const widthNum = parseInt(widthStr);
  if (isNaN(widthNum) || widthNum <= 0) {
    res.status(400).json({
      success: false,
      error: 'Width must be a positive number'
    });
    return;
  }

  // Validate height
  const heightStr = String(height);
  const heightNum = parseInt(heightStr);
  if (isNaN(heightNum) || heightNum <= 0) {
    res.status(400).json({
      success: false,
      error: 'Height must be a positive number'
    });
    return;
  }

  // Store validated parameters in request object for use in route handler
  (req as Request & { validatedParams: { filename: string; width: number; height: number } }).validatedParams = {
    filename: filename.trim(),
    width: widthNum,
    height: heightNum
  };

  next();
};
