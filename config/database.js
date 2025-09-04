const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'adroid_swimming',
      port: Number(process.env.DB_PORT || 3306),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      acquireTimeout: 60000,
      timeout: 60000
    });

    const connection = await pool.getConnection();
    console.log(`MySQL Connected: ${process.env.DB_HOST || 'localhost'}`);
    connection.release();

    await initializeTables();
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

const initializeTables = async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        fullName VARCHAR(100) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        isActive BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS pools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        homeOwnerName VARCHAR(100) NOT NULL,
        phone BIGINT NOT NULL,
        address VARCHAR(200) NOT NULL,
        city VARCHAR(50) NOT NULL,
        state VARCHAR(50) NOT NULL,
        zipCode INT NOT NULL,
        length DECIMAL(10,2) NOT NULL,
        width DECIMAL(10,2) NOT NULL,
        gallons INT NOT NULL,
        howManyInlets INT NOT NULL DEFAULT 0,
        howManySkimmers INT NOT NULL DEFAULT 0,
        howManyLadders INT NOT NULL DEFAULT 0,
        howManySteps INT NOT NULL DEFAULT 0,
        filterBrand VARCHAR(50),
        filterModel VARCHAR(50),
        filterSerial VARCHAR(50),
        pumpBrand VARCHAR(50),
        pumpModel VARCHAR(50),
        pumpSerial VARCHAR(50),
        heaterBrandNG VARCHAR(50),
        heaterModelNG VARCHAR(50),
        heaterSerialNG VARCHAR(50),
        heaterBrandCBMS VARCHAR(50),
        heaterModelCBMS VARCHAR(50),
        heaterSerialCBMS VARCHAR(50),
        poolCleanerBrand VARCHAR(50),
        poolCleanerModel VARCHAR(50),
        poolCleanerSerial VARCHAR(50),
        userId INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_homeOwnerName (homeOwnerName),
        INDEX idx_city (city),
        INDEX idx_userId (userId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing tables:', error);
    throw error;
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return pool;
};

module.exports = { connectDB, getPool };
