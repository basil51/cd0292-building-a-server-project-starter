"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageRoutes_1 = require("./routes/imageRoutes");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/images', imageRoutes_1.imageRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Image Processing API is running' });
});
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Image processing: http://localhost:${PORT}/api/images`);
});
exports.default = app;
//# sourceMappingURL=index.js.map