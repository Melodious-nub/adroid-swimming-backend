# Adroid Swimming Pool Management API

A comprehensive REST API for managing swimming pool information and equipment details built with Express.js and MongoDB.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, and Delete pool records
- **Search Functionality**: Search pools by home owner name or city
- **Data Validation**: Comprehensive input validation and error handling
- **Professional Documentation**: Interactive Swagger/OpenAPI documentation
- **Security**: CORS enabled, rate limiting, and security headers
- **Best Practices**: Clean architecture with separated concerns

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd adroid-swimming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb+srv://shawontaluckder1:4R00XPajU8lqlnOo@cluster0.oww9gdb.mongodb.net/adroidSwimming?retryWrites=true&w=majority
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

Once the server is running, visit:
- **Interactive API Docs**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
- **API Base URL**: http://localhost:3000/api

## 🏊‍♂️ Pool Data Model

The API manages swimming pool records with the following properties:

### Required Fields
- `homeOwnerName` (string): Name of the home owner
- `phone` (number): Phone number (10-15 digits)
- `address` (string): Pool address
- `city` (string): City name
- `state` (string): State name
- `zipCode` (number): Zip code (5-10 digits)
- `length` (number): Pool length in feet
- `width` (number): Pool width in feet
- `gallons` (number): Pool capacity in gallons
- `howManyInlets` (number): Number of pool inlets
- `howManySkimmers` (number): Number of pool skimmers
- `howManyLadders` (number): Number of pool ladders
- `howManySteps` (number): Number of pool steps

### Optional Fields
- `filterBrand`, `filterModel`, `filterSerial`: Filter equipment details
- `pumpBrand`, `pumpModel`, `pumpSerial`: Pump equipment details
- `heaterBrandNG`, `heaterModelNG`, `heaterSerialNG`: Natural gas heater details
- `heaterBrandCBMS`, `heaterModelCBMS`, `heaterSerialCBMS`: CBMS heater details
- `poolCleanerBrand`, `poolCleanerModel`, `poolCleanerSerial`: Pool cleaner details

## 🔌 API Endpoints

### Pools

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pools` | Get all pools |
| GET | `/api/pools/search?q=term` | Search pools by name or city |
| GET | `/api/pools/:id` | Get a specific pool |
| POST | `/api/pools` | Create a new pool |
| PUT | `/api/pools/:id` | Update a pool |
| DELETE | `/api/pools/:id` | Delete a pool |

## 📝 Usage Examples

### Create a New Pool
```bash
curl -X POST http://localhost:3000/api/pools \
  -H "Content-Type: application/json" \
  -d '{
    "homeOwnerName": "John Doe",
    "phone": 1234567890,
    "address": "123 Pool Street",
    "city": "Miami",
    "state": "FL",
    "zipCode": 33101,
    "length": 30,
    "width": 15,
    "gallons": 15000,
    "howManyInlets": 2,
    "howManySkimmers": 1,
    "howManyLadders": 1,
    "howManySteps": 4,
    "filterBrand": "Hayward",
    "filterModel": "C4030",
    "filterSerial": "F123456"
  }'
```

### Get All Pools
```bash
curl http://localhost:3000/api/pools
```

### Search Pools
```bash
curl "http://localhost:3000/api/pools/search?q=John"
```

### Update a Pool
```bash
curl -X PUT http://localhost:3000/api/pools/[POOL_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "gallons": 18000
  }'
```

### Delete a Pool
```bash
curl -X DELETE http://localhost:3000/api/pools/[POOL_ID]
```

## 🏗️ Project Structure

```
adroid-swimming/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── README.md             # Project documentation
├── config/
│   ├── database.js       # MongoDB connection configuration
│   └── swagger.js        # Swagger documentation configuration
├── controllers/
│   └── poolController.js # Pool CRUD operations
├── middleware/
│   └── errorHandler.js   # Global error handling
├── models/
│   └── Pool.js          # Mongoose schema and model
└── routes/
    └── pools.js         # Pool API routes
```

## 🔒 Security Features

- **CORS**: Configured to allow all origins
- **Helmet**: Security headers for protection
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive data validation
- **Error Handling**: Centralized error management

## 🧪 Testing

The API includes comprehensive error handling and validation. Test the endpoints using:

1. **Swagger UI**: http://localhost:3000/api-docs
2. **Postman**: Import the endpoints
3. **cURL**: Use the examples above

## 🚀 Deployment

### Environment Variables
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

### Production Considerations
- Set `NODE_ENV=production`
- Use environment-specific MongoDB URI
- Configure proper CORS origins
- Set up monitoring and logging
- Use PM2 or similar process manager

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: shawon.taluckder2@gmail.com
- Documentation: http://localhost:3000/api-docs
- Health Check: http://localhost:3000/health
