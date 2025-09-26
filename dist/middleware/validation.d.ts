import { Request, Response, NextFunction } from 'express';
export interface ImageQueryParams {
    filename: string;
    width: string;
    height: string;
}
export declare const validateImageParams: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.d.ts.map