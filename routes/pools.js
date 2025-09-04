const express = require('express');
const router = express.Router();
const {
  getPools,
  getPool,
  createPool,
  updatePool,
  deletePool,
  searchPools
} = require('../controllers/poolController');
const { protect } = require('../middleware/auth');
/**
 * @swagger
 * /api/pools:
 *   get:
 *     summary: Get all pools
 *     description: Retrieve a list of all swimming pools (requires authentication)
 *     tags: [Pools]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pools retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pool'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', protect, getPools);

/**
 * @swagger
 * /api/pools/search:
 *   get:
 *     summary: Search pools
 *     description: Search pools by home owner name or city (requires authentication)
 *     tags: [Pools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term for home owner name or city
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pool'
 *       400:
 *         description: Search query is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/search', protect, searchPools);

/**
 * @swagger
 * /api/pools/{id}:
 *   get:
 *     summary: Get a single pool
 *     description: Retrieve a specific pool by ID (requires authentication)
 *     tags: [Pools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pool ID
 *     responses:
 *       200:
 *         description: Pool retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Pool'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pool not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', protect, getPool);

/**
 * @swagger
 * /api/pools:
 *   post:
 *     summary: Create a new pool
 *     description: Add a new swimming pool record with all 28 fields (requires authentication)
 *     tags: [Pools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PoolCreate'
 *           example:
 *             # Required Fields (13)
 *             homeOwnerName: "John Doe"
 *             phone: 1234567890
 *             address: "123 Pool Street"
 *             city: "Miami"
 *             state: "FL"
 *             zipCode: 33101
 *             length: 30
 *             width: 15
 *             gallons: 15000
 *             howManyInlets: 2
 *             howManySkimmers: 1
 *             howManyLadders: 1
 *             howManySteps: 4
 *             # Optional Equipment Fields (15)
 *             filterBrand: "Hayward"
 *             filterModel: "C4030"
 *             filterSerial: "F123456"
 *             pumpBrand: "Pentair"
 *             pumpModel: "SuperFlo"
 *             pumpSerial: "P789012"
 *             heaterBrandNG: "Rheem"
 *             heaterModelNG: "NG-200"
 *             heaterSerialNG: "HNG123456"
 *             heaterBrandCBMS: "Jandy"
 *             heaterModelCBMS: "CBMS-150"
 *             heaterSerialCBMS: "HCBMS789012"
 *             poolCleanerBrand: "Dolphin"
 *             poolCleanerModel: "Nautilus Plus"
 *             poolCleanerSerial: "PC345678"
 *     responses:
 *       201:
 *         description: Pool created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Pool'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', protect, createPool);

/**
 * @swagger
 * /api/pools/{id}:
 *   put:
 *     summary: Update a pool
 *     description: Update an existing swimming pool record with all 28 fields (requires authentication)
 *     tags: [Pools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pool ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PoolCreate'
 *           example:
 *             # Required Fields (13)
 *             homeOwnerName: "John Doe Updated"
 *             phone: 1234567890
 *             address: "123 Pool Street"
 *             city: "Miami"
 *             state: "FL"
 *             zipCode: 33101
 *             length: 30
 *             width: 15
 *             gallons: 18000
 *             howManyInlets: 2
 *             howManySkimmers: 1
 *             howManyLadders: 1
 *             howManySteps: 4
 *             # Optional Equipment Fields (15)
 *             filterBrand: "Hayward"
 *             filterModel: "C4030"
 *             filterSerial: "F123456"
 *             pumpBrand: "Pentair"
 *             pumpModel: "SuperFlo"
 *             pumpSerial: "P789012"
 *             heaterBrandNG: "Rheem"
 *             heaterModelNG: "NG-200"
 *             heaterSerialNG: "HNG123456"
 *             heaterBrandCBMS: "Jandy"
 *             heaterModelCBMS: "CBMS-150"
 *             heaterSerialCBMS: "HCBMS789012"
 *             poolCleanerBrand: "Dolphin"
 *             poolCleanerModel: "Nautilus Plus"
 *             poolCleanerSerial: "PC345678"
 *     responses:
 *       200:
 *         description: Pool updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Pool'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pool not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', protect, updatePool);

/**
 * @swagger
 * /api/pools/{id}:
 *   delete:
 *     summary: Delete a pool
 *     description: Remove a swimming pool record (requires authentication)
 *     tags: [Pools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pool ID
 *     responses:
 *       200:
 *         description: Pool deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Pool deleted successfully"
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pool not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', protect, deletePool);

module.exports = router;
