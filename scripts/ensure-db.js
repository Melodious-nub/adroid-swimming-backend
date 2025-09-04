// Ensure the MySQL database exists using env vars
const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  try {
    const host = process.env.DB_HOST || 'localhost';
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const port = Number(process.env.DB_PORT || 3306);
    const db = process.env.DB_NAME || 'adroid_swimming';

    console.log(`Connecting to MySQL host=${host} user=${user} port=${port}`);
    const conn = await mysql.createConnection({ host, user, password, port });
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${db}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await conn.end();
    console.log(`✅ Ensured database: ${db}`);
    process.exit(0);
  } catch (e) {
    console.error('DB ensure failed:', e && (e.message || e.code || e.errno || e.sqlMessage));
    if (e && e.stack) console.error(e.stack);
    process.exit(1);
  }
})();


