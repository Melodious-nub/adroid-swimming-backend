const { getPool } = require('../config/database');

class Pool {
  static async create(poolData, userId = null) {
    const pool = getPool();
    const {
      homeOwnerName, phone, address, city, state, zipCode,
      length, width, gallons, howManyInlets, howManySkimmers,
      howManyLadders, howManySteps, filterBrand, filterModel,
      filterSerial, pumpBrand, pumpModel, pumpSerial,
      heaterBrandNG, heaterModelNG, heaterSerialNG,
      heaterBrandCBMS, heaterModelCBMS, heaterSerialCBMS,
      poolCleanerBrand, poolCleanerModel, poolCleanerSerial
    } = poolData;

    const [result] = await pool.execute(`
      INSERT INTO pools (
        homeOwnerName, phone, address, city, state, zipCode,
        length, width, gallons, howManyInlets, howManySkimmers,
        howManyLadders, howManySteps, filterBrand, filterModel,
        filterSerial, pumpBrand, pumpModel, pumpSerial,
        heaterBrandNG, heaterModelNG, heaterSerialNG,
        heaterBrandCBMS, heaterModelCBMS, heaterSerialCBMS,
        poolCleanerBrand, poolCleanerModel, poolCleanerSerial, userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      homeOwnerName, phone, address, city, state, zipCode,
      length, width, gallons, howManyInlets, howManySkimmers,
      howManyLadders, howManySteps, filterBrand, filterModel,
      filterSerial, pumpBrand, pumpModel, pumpSerial,
      heaterBrandNG, heaterModelNG, heaterSerialNG,
      heaterBrandCBMS, heaterModelCBMS, heaterSerialCBMS,
      poolCleanerBrand, poolCleanerModel, poolCleanerSerial, userId
    ]);

    return this.findById(result.insertId);
  }

  static async findAll() {
    const pool = getPool();
    const [rows] = await pool.execute(`
      SELECT p.*, u.username as created_by 
      FROM pools p 
      LEFT JOIN users u ON p.userId = u.id 
      ORDER BY p.createdAt DESC
    `);
    return rows;
  }

  static async findById(id) {
    const pool = getPool();
    const [rows] = await pool.execute(`
      SELECT p.*, u.username as created_by 
      FROM pools p 
      LEFT JOIN users u ON p.userId = u.id 
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  }

  static async update(id, poolData) {
    const pool = getPool();
    const {
      homeOwnerName, phone, address, city, state, zipCode,
      length, width, gallons, howManyInlets, howManySkimmers,
      howManyLadders, howManySteps, filterBrand, filterModel,
      filterSerial, pumpBrand, pumpModel, pumpSerial,
      heaterBrandNG, heaterModelNG, heaterSerialNG,
      heaterBrandCBMS, heaterModelCBMS, heaterSerialCBMS,
      poolCleanerBrand, poolCleanerModel, poolCleanerSerial
    } = poolData;

    await pool.execute(`
      UPDATE pools SET 
        homeOwnerName = ?, phone = ?, address = ?, city = ?, state = ?, zipCode = ?,
        length = ?, width = ?, gallons = ?, howManyInlets = ?, howManySkimmers = ?,
        howManyLadders = ?, howManySteps = ?, filterBrand = ?, filterModel = ?,
        filterSerial = ?, pumpBrand = ?, pumpModel = ?, pumpSerial = ?,
        heaterBrandNG = ?, heaterModelNG = ?, heaterSerialNG = ?,
        heaterBrandCBMS = ?, heaterModelCBMS = ?, heaterSerialCBMS = ?,
        poolCleanerBrand = ?, poolCleanerModel = ?, poolCleanerSerial = ?
      WHERE id = ?
    `, [
      homeOwnerName, phone, address, city, state, zipCode,
      length, width, gallons, howManyInlets, howManySkimmers,
      howManyLadders, howManySteps, filterBrand, filterModel,
      filterSerial, pumpBrand, pumpModel, pumpSerial,
      heaterBrandNG, heaterModelNG, heaterSerialNG,
      heaterBrandCBMS, heaterModelCBMS, heaterSerialCBMS,
      poolCleanerBrand, poolCleanerModel, poolCleanerSerial, id
    ]);

    return this.findById(id);
  }

  static async delete(id) {
    const pool = getPool();
    const [result] = await pool.execute('DELETE FROM pools WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async search(query) {
    const pool = getPool();
    const searchTerm = `%${query}%`;
    const [rows] = await pool.execute(`
      SELECT p.*, u.username as created_by 
      FROM pools p 
      LEFT JOIN users u ON p.userId = u.id 
      WHERE p.homeOwnerName LIKE ? OR p.city LIKE ?
      ORDER BY p.createdAt DESC
    `, [searchTerm, searchTerm]);
    return rows;
  }
}

module.exports = Pool;
