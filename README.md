# Image Processing API

A Node.js Express server built with TypeScript that provides image resizing functionality using the Sharp library. This project demonstrates scalable code architecture, comprehensive testing, and real-world API development practices.

## Features

- **Image Resizing**: Resize JPG images to specified dimensions
- **Caching**: Automatic caching of processed images to avoid reprocessing
- **TypeScript**: Full TypeScript implementation with strict type checking
- **Testing**: Comprehensive test suite using Jasmine
- **Error Handling**: Robust error handling with meaningful error messages
- **Validation**: Input validation for all API parameters
- **Code Quality**: ESLint and Prettier for code formatting and linting

## Available Images

The following images are available for processing:
- `encenadaport.jpg`
- `fjord.jpg`
- `icelandwaterfall.jpg`
- `palmtunnel.jpg`
- `santamonica.jpg`

## Installation

1. Clone the repository:
```bash
git clone https://github.com/basil51/cd0292-building-a-server-project-starter.git
cd cd0292-building-a-server-project-starter
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

The server will start on port 3000 by default.

## Development

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

**Response:**
```json
{
  "status": "OK",
  "message": "Image Processing API is running"
}
```

### List Available Images
- **GET** `/api/images`
- Returns list of available images for processing

**Response:**
```json
{
  "success": true,
  "images": ["encenadaport.jpg", "fjord.jpg", "icelandwaterfall.jpg", "palmtunnel.jpg", "santamonica.jpg"],
  "message": "Found 5 available images"
}
```

### Resize Image
- **GET** `/api/images/resize`
- Resizes an image to specified dimensions

**Query Parameters:**
- `filename` (required): Name of the image file (JPG only)
- `width` (required): Target width in pixels (positive integer)
- `height` (required): Target height in pixels (positive integer)

**Example:**
```
GET /api/images/resize?filename=encenadaport.jpg&width=200&height=200
```

**Success Response:**
- Returns the resized image as a JPEG file

**Error Responses:**
```json
{
  "success": false,
  "error": "Missing required parameters. Please provide filename, width, and height."
}
```

```json
{
  "success": false,
  "error": "Only JPG images are supported"
}
```

```json
{
  "success": false,
  "error": "Image 'nonexistent.jpg' not found"
}
```

## Testing

Run the test suite:
```bash
npm test
```

The test suite includes:
- Unit tests for image processing functionality
- API endpoint tests
- Validation tests
- Error handling tests

## Code Quality

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
npm run format:check
```

## Project Structure

```
├── src/
│   ├── index.ts              # Main server file
│   ├── routes/
│   │   └── imageRoutes.ts    # Image processing routes
│   ├── middleware/
│   │   ├── validation.ts     # Input validation middleware
│   │   └── errorHandler.ts   # Error handling middleware
│   └── utils/
│       └── imageProcessor.ts # Image processing logic
├── tests/
│   ├── imageProcessor.spec.ts # Unit tests for image processing
│   └── routes.spec.ts        # API endpoint tests
├── images/                   # Input images directory
├── images/thumb/            # Processed images cache
└── dist/                    # Compiled JavaScript output
```

## Caching

The API automatically caches processed images in the `images/thumb/` directory. If a request is made for the same image with the same dimensions, the cached version will be returned instead of reprocessing the image.

## Error Handling

The API provides comprehensive error handling for:
- Missing or invalid parameters
- Non-existent images
- Unsupported image formats
- Invalid dimensions
- Server errors

All errors return JSON responses with descriptive error messages.

## Usage Examples

### Using curl

1. **Check server health:**
```bash
curl http://localhost:3000/health
```

2. **List available images:**
```bash
curl http://localhost:3000/api/images
```

3. **Resize an image:**
```bash
curl "http://localhost:3000/api/images/resize?filename=encenadaport.jpg&width=300&height=200" -o resized_image.jpg
```

### Using a web browser

1. **Health check:** http://localhost:3000/health
2. **List images:** http://localhost:3000/api/images
3. **Resize image:** http://localhost:3000/api/images/resize?filename=encenadaport.jpg&width=200&height=200

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **Sharp**: High-performance image processing
- **Jasmine**: Testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Supertest**: HTTP testing

## License

This project is licensed under the ISC License - see the [LICENSE.txt](LICENSE.txt) file for details.

## Version Control

Although not a requirement, we recommend using Git from the very beginning if you choose to build on your local environment or use the provided workspace. Make sure to commit often and to use well-formatted commit messages.

## License

[License](LICENSE.txt)
