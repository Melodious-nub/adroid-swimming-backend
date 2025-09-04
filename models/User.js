const bcrypt = require('bcryptjs');
const { getPool } = require('../config/database');

class User {
  static async create(userData) {
    const pool = getPool();
    const { username, email, password, fullName, role = 'user' } = userData;

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, fullName, role) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, fullName, role]
    );

    return { id: result.insertId, username, email, fullName, role };
  }

  static async findByEmail(email) {
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ? AND isActive = TRUE',
      [email]
    );
    return rows[0];
  }

  static async findByUsername(username) {
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ? AND isActive = TRUE',
      [username]
    );
    return rows[0];
  }

  static async findById(id) {
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT id, username, email, fullName, role, createdAt FROM users WHERE id = ? AND isActive = TRUE',
      [id]
    );
    return rows[0];
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;


