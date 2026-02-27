# Image Storage - Local vs Cloud

## Local Development (Default)

For local development, **no cloud storage is needed**. Images are stored locally in the `backend/src/uploads/` directory.

### How it works:
1. When you upload a hotel image, it's saved to `backend/src/uploads/`
2. Images are served via HTTP at `http://localhost:5000/uploads/filename.jpg`
3. The uploads directory is mounted as a Docker volume, so files persist

### Benefits:
✅ **No external dependencies** - works out of the box  
✅ **Faster development** - no network calls  
✅ **No API keys needed** - just run and go  
✅ **Free** - no cloud costs for development  

### Setup:
```bash
# Just copy the .env and leave Cloudinary empty
cp .env.example .env

# These can be EMPTY for local dev:
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Production (Cloudinary - Optional)

For production deployments, you can configure Cloudinary for reliable cloud storage.

### Why Cloudinary in production?
- **CDN delivery** - faster image loading globally
- **Automatic optimization** - resizing, compression
- **Reliability** - no storage limits from server disk
- **Transformations** - on-the-fly image manipulation

### Setup:
1. Create free account at https://cloudinary.com
2. Get your credentials from the dashboard
3. Add to `.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## How the Code Decides

The backend automatically detects which storage to use:

```typescript
// From backend/src/controllers/admin/addHotel.ts
const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};
```

- **If all 3 Cloudinary vars are set** → uploads to Cloudinary
- **If any are missing/empty** → saves locally to `uploads/`

## Uploads Directory Structure

```
backend/
├── src/
│   ├── uploads/          # Local image storage
│   │   ├── .gitkeep      # Keeps folder in git
│   │   └── 1234567.jpg   # Uploaded images (ignored by git)
│   └── app.ts            # Serves /uploads as static files
```

## Accessing Images

### Local Storage:
```
http://localhost:5000/uploads/1234567890.jpg
```

### Cloudinary:
```
https://res.cloudinary.com/your_cloud/image/upload/hotel_images/abc123.jpg
```

## Docker Volume Mount

The `docker-compose.yml` mounts the uploads folder:

```yaml
volumes:
  - ./backend/src/uploads:/app/src/uploads
```

This ensures uploaded images persist even if you restart containers.

## Git Ignore

Uploaded files are ignored by git but the directory is preserved:

```gitignore
# backend/.gitignore
uploads/*
!uploads/.gitkeep
```

## Switching Between Storage Types

You can switch anytime by just adding/removing Cloudinary credentials:

```bash
# Switch to Cloudinary
echo "CLOUDINARY_CLOUD_NAME=mycloud" >> .env
echo "CLOUDINARY_API_KEY=mykey" >> .env
echo "CLOUDINARY_API_SECRET=mysecret" >> .env
docker-compose restart backend

# Switch back to local
# Just empty those vars in .env or remove them
docker-compose restart backend
```

## Best Practices

### Development:
- ✅ Use local storage (faster, simpler)
- ✅ Commit `.gitkeep` but not actual images
- ✅ Test with sample images

### Production:
- ✅ Use Cloudinary for reliability
- ✅ Set up CDN for fast delivery
- ✅ Enable automatic backups
- ✅ Configure image optimizations

## Troubleshooting

### "Cannot access uploaded images"

Check if uploads directory exists and has correct permissions:
```bash
docker-compose exec backend ls -la src/uploads/
```

### "Images not persisting"

Make sure the Docker volume is mounted:
```bash
docker-compose down
docker-compose up
```

### "Cloudinary upload failing"

Check your credentials and try a test upload:
```bash
docker-compose exec backend node -e "
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('Config:', cloudinary.config());
"
```
