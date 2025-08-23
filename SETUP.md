# Quick Setup Guide

## 🚀 Immediate Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp env.example .env
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

## ✅ Verification

Once started, verify the application is working:

1. **Health Check**: http://localhost:3000/health
2. **API Documentation**: http://localhost:3000/api-docs
3. **API Root**: http://localhost:3000/

## 🧪 Quick Test

Test the API with a sample pool creation:

```bash
curl -X POST http://localhost:3000/api/pools \
  -H "Content-Type: application/json" \
  -d '{
    "homeOwnerName": "Test User",
    "phone": 1234567890,
    "address": "456 Test Ave",
    "city": "Test City",
    "state": "TS",
    "zipCode": 12345,
    "length": 25,
    "width": 12,
    "gallons": 12000,
    "howManyInlets": 1,
    "howManySkimmers": 1,
    "howManyLadders": 1,
    "howManySteps": 3
  }'
```

## 📚 Available Endpoints

- `GET /api/pools` - Get all pools
- `GET /api/pools/search?q=term` - Search pools
- `GET /api/pools/:id` - Get specific pool
- `POST /api/pools` - Create new pool
- `PUT /api/pools/:id` - Update pool
- `DELETE /api/pools/:id` - Delete pool

## 🔧 Development

For development with auto-restart:
```bash
npm run dev
```

## 📖 Full Documentation

See `README.md` for complete documentation and examples.
