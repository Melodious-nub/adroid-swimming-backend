const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adroid Swimming Pool Management API',
      version: '1.0.0',
      description: 'A comprehensive API for managing swimming pool information and equipment details. This API provides full CRUD operations for swimming pool records including owner information, pool specifications, and equipment details.',
      contact: {
        name: 'API Support',
        email: 'support@adroidswimming.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://adroid-swimming-backend.onrender.com',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password', 'fullName'],
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'john_doe' },
            email: { type: 'string', example: 'john@example.com' },
            fullName: { type: 'string', example: 'John Doe' },
            role: { type: 'string', example: 'user' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Pool: {
          type: 'object',
          required: [
            'homeOwnerName', 'phone', 'address', 'city', 'state', 'zipCode',
            'length', 'width', 'gallons', 'howManyInlets', 'howManySkimmers',
            'howManyLadders', 'howManySteps'
          ],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated unique identifier',
              example: '68a777a3f24a38be22481d88'
            },
            homeOwnerName: {
              type: 'string',
              description: 'Name of the home owner',
              maxLength: 100,
              example: 'John Doe'
            },
            phone: {
              type: 'number',
              description: 'Phone number (10-15 digits)',
              example: 1234567890
            },
            address: {
              type: 'string',
              description: 'Pool address',
              maxLength: 200,
              example: '123 Pool Street'
            },
            city: {
              type: 'string',
              description: 'City name',
              maxLength: 50,
              example: 'Miami'
            },
            state: {
              type: 'string',
              description: 'State name',
              maxLength: 50,
              example: 'FL'
            },
            zipCode: {
              type: 'number',
              description: 'Zip code (5-10 digits)',
              example: 33101
            },
            length: {
              type: 'number',
              description: 'Pool length in feet',
              minimum: 1,
              example: 30
            },
            width: {
              type: 'number',
              description: 'Pool width in feet',
              minimum: 1,
              example: 15
            },
            gallons: {
              type: 'number',
              description: 'Pool capacity in gallons',
              minimum: 1,
              example: 15000
            },
            howManyInlets: {
              type: 'number',
              description: 'Number of pool inlets',
              minimum: 0,
              example: 2
            },
            howManySkimmers: {
              type: 'number',
              description: 'Number of pool skimmers',
              minimum: 0,
              example: 1
            },
            howManyLadders: {
              type: 'number',
              description: 'Number of pool ladders',
              minimum: 0,
              example: 1
            },
            howManySteps: {
              type: 'number',
              description: 'Number of pool steps',
              minimum: 0,
              example: 4
            },
            filterBrand: {
              type: 'string',
              description: 'Filter brand name',
              maxLength: 50,
              example: 'Hayward'
            },
            filterModel: {
              type: 'string',
              description: 'Filter model number',
              maxLength: 50,
              example: 'C4030'
            },
            filterSerial: {
              type: 'string',
              description: 'Filter serial number',
              maxLength: 50,
              example: 'F123456'
            },
            pumpBrand: {
              type: 'string',
              description: 'Pump brand name',
              maxLength: 50,
              example: 'Pentair'
            },
            pumpModel: {
              type: 'string',
              description: 'Pump model number',
              maxLength: 50,
              example: 'SuperFlo'
            },
            pumpSerial: {
              type: 'string',
              description: 'Pump serial number',
              maxLength: 50,
              example: 'P789012'
            },
            heaterBrandNG: {
              type: 'string',
              description: 'Natural gas heater brand',
              maxLength: 50,
              example: 'Rheem'
            },
            heaterModelNG: {
              type: 'string',
              description: 'Natural gas heater model',
              maxLength: 50,
              example: 'NG-200'
            },
            heaterSerialNG: {
              type: 'string',
              description: 'Natural gas heater serial',
              maxLength: 50,
              example: 'HNG123456'
            },
            heaterBrandCBMS: {
              type: 'string',
              description: 'CBMS heater brand',
              maxLength: 50,
              example: 'Jandy'
            },
            heaterModelCBMS: {
              type: 'string',
              description: 'CBMS heater model',
              maxLength: 50,
              example: 'CBMS-150'
            },
            heaterSerialCBMS: {
              type: 'string',
              description: 'CBMS heater serial',
              maxLength: 50,
              example: 'HCBMS789012'
            },
            poolCleanerBrand: {
              type: 'string',
              description: 'Pool cleaner brand',
              maxLength: 50,
              example: 'Dolphin'
            },
            poolCleanerModel: {
              type: 'string',
              description: 'Pool cleaner model',
              maxLength: 50,
              example: 'Nautilus Plus'
            },
            poolCleanerSerial: {
              type: 'string',
              description: 'Pool cleaner serial',
              maxLength: 50,
              example: 'PC345678'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record creation timestamp',
              example: '2025-08-21T19:46:43.552Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record last update timestamp',
              example: '2025-08-21T19:46:43.552Z'
            }
          }
        },
        PoolCreate: {
          type: 'object',
          required: [
            'homeOwnerName', 'phone', 'address', 'city', 'state', 'zipCode',
            'length', 'width', 'gallons', 'howManyInlets', 'howManySkimmers',
            'howManyLadders', 'howManySteps'
          ],
          properties: {
            homeOwnerName: {
              type: 'string',
              description: 'Name of the home owner',
              maxLength: 100,
              example: 'John Doe'
            },
            phone: {
              type: 'number',
              description: 'Phone number (10-15 digits)',
              example: 1234567890
            },
            address: {
              type: 'string',
              description: 'Pool address',
              maxLength: 200,
              example: '123 Pool Street'
            },
            city: {
              type: 'string',
              description: 'City name',
              maxLength: 50,
              example: 'Miami'
            },
            state: {
              type: 'string',
              description: 'State name',
              maxLength: 50,
              example: 'FL'
            },
            zipCode: {
              type: 'number',
              description: 'Zip code (5-10 digits)',
              example: 33101
            },
            length: {
              type: 'number',
              description: 'Pool length in feet',
              minimum: 1,
              example: 30
            },
            width: {
              type: 'number',
              description: 'Pool width in feet',
              minimum: 1,
              example: 15
            },
            gallons: {
              type: 'number',
              description: 'Pool capacity in gallons',
              minimum: 1,
              example: 15000
            },
            howManyInlets: {
              type: 'number',
              description: 'Number of pool inlets',
              minimum: 0,
              example: 2
            },
            howManySkimmers: {
              type: 'number',
              description: 'Number of pool skimmers',
              minimum: 0,
              example: 1
            },
            howManyLadders: {
              type: 'number',
              description: 'Number of pool ladders',
              minimum: 0,
              example: 1
            },
            howManySteps: {
              type: 'number',
              description: 'Number of pool steps',
              minimum: 0,
              example: 4
            },
            filterBrand: {
              type: 'string',
              description: 'Filter brand name',
              maxLength: 50,
              example: 'Hayward'
            },
            filterModel: {
              type: 'string',
              description: 'Filter model number',
              maxLength: 50,
              example: 'C4030'
            },
            filterSerial: {
              type: 'string',
              description: 'Filter serial number',
              maxLength: 50,
              example: 'F123456'
            },
            pumpBrand: {
              type: 'string',
              description: 'Pump brand name',
              maxLength: 50,
              example: 'Pentair'
            },
            pumpModel: {
              type: 'string',
              description: 'Pump model number',
              maxLength: 50,
              example: 'SuperFlo'
            },
            pumpSerial: {
              type: 'string',
              description: 'Pump serial number',
              maxLength: 50,
              example: 'P789012'
            },
            heaterBrandNG: {
              type: 'string',
              description: 'Natural gas heater brand',
              maxLength: 50,
              example: 'Rheem'
            },
            heaterModelNG: {
              type: 'string',
              description: 'Natural gas heater model',
              maxLength: 50,
              example: 'NG-200'
            },
            heaterSerialNG: {
              type: 'string',
              description: 'Natural gas heater serial',
              maxLength: 50,
              example: 'HNG123456'
            },
            heaterBrandCBMS: {
              type: 'string',
              description: 'CBMS heater brand',
              maxLength: 50,
              example: 'Jandy'
            },
            heaterModelCBMS: {
              type: 'string',
              description: 'CBMS heater model',
              maxLength: 50,
              example: 'CBMS-150'
            },
            heaterSerialCBMS: {
              type: 'string',
              description: 'CBMS heater serial',
              maxLength: 50,
              example: 'HCBMS789012'
            },
            poolCleanerBrand: {
              type: 'string',
              description: 'Pool cleaner brand',
              maxLength: 50,
              example: 'Dolphin'
            },
            poolCleanerModel: {
              type: 'string',
              description: 'Pool cleaner model',
              maxLength: 50,
              example: 'Nautilus Plus'
            },
            poolCleanerSerial: {
              type: 'string',
              description: 'Pool cleaner serial',
              maxLength: 50,
              example: 'PC345678'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            },
            error: {
              type: 'string',
              example: 'Detailed error information'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            count: {
              type: 'number',
              example: 1
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;
