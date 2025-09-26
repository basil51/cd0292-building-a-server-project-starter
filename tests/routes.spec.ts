import request from 'supertest';
import app from '../src/index';

describe('Image Processing API Routes', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('Image Processing API is running');
    });
  });

  describe('GET /api/images', () => {
    it('should return list of available images', async () => {
      const response = await request(app)
        .get('/api/images')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.images)).toBe(true);
      expect(response.body.message).toContain('Found');
    });
  });

  describe('GET /api/images/resize', () => {
    it('should resize image with valid parameters', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'encenadaport.jpg',
          width: 200,
          height: 200
        })
        .expect(200);

      expect(response.headers['content-type']).toMatch(/image\/jpeg/);
    });

    it('should return 400 for missing filename', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          width: 200,
          height: 200
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Missing required parameters');
    });

    it('should return 400 for missing width', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'encenadaport.jpg',
          height: 200
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Missing required parameters');
    });

    it('should return 400 for missing height', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'encenadaport.jpg',
          width: 200
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Missing required parameters');
    });

    it('should return 400 for invalid width', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'encenadaport.jpg',
          width: 'invalid',
          height: 200
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Width must be a positive number');
    });

    it('should return 400 for invalid height', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'encenadaport.jpg',
          width: 200,
          height: 'invalid'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Height must be a positive number');
    });

    it('should return 400 for negative width', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'encenadaport.jpg',
          width: -100,
          height: 200
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Width must be a positive number');
    });

    it('should return 400 for negative height', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'encenadaport.jpg',
          width: 200,
          height: -100
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Height must be a positive number');
    });

    it('should return 400 for non-existent image', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'nonexistent.jpg',
          width: 200,
          height: 200
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('not found');
    });

    it('should return 400 for unsupported image format', async () => {
      const response = await request(app)
        .get('/api/images/resize')
        .query({
          filename: 'test.png',
          width: 200,
          height: 200
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Only JPG images are supported');
    });
  });

  describe('Error handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);
    });
  });
});
