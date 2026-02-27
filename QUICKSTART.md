# Quick Start - 3 Steps! 🚀

## For Local Development (No Cloud Required)

### 1️⃣ Copy Environment File
```bash
cp .env.example .env
```

### 2️⃣ Edit `.env` - Only JWT_SECRET Required!
```env
# REQUIRED - Set any secret string
JWT_SECRET=my-super-secret-key-123

# OPTIONAL - Leave empty for local storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Default API URL
VITE_API_URL=http://localhost:5000/api
```

### 3️⃣ Start Everything
```bash
docker-compose up
```

**That's it!** 

## Access URLs

- 🌐 **Frontend:** http://localhost:5173
- 🔌 **Backend API:** http://localhost:5000  
- 🗄️ **Database:** localhost:5432
- 📁 **Uploaded Images:** http://localhost:5000/uploads/

## What Happens Automatically

✅ PostgreSQL database starts  
✅ Database migrations run  
✅ Sample data seeded (hotels, admin users)  
✅ Backend API starts with hot reload  
✅ Frontend dev server starts with hot reload  
✅ **Images saved locally** in `backend/src/uploads/`  

## Default Admin Account

Check `backend/prisma/seed.ts` for default admin credentials to add hotels.

## Stop Services

```bash
# Stop (keeps data)
docker-compose down

# Stop and delete everything (clean slate)
docker-compose down -v
```

## Optional: Use Cloudinary for Production

Only needed if you want cloud storage instead of local files:

1. Get free account: https://cloudinary.com
2. Add credentials to `.env`
3. Restart: `docker-compose restart backend`

---

**Need help?** See [DOCKER_SETUP.md](DOCKER_SETUP.md) or [IMAGE_STORAGE.md](IMAGE_STORAGE.md)
