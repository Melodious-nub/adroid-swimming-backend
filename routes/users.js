const express = require('express');
const { body } = require('express-validator');
const { createMember } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Admin user management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new member user
 *     description: Admin-only endpoint to create member accounts (non-admin users). Login is required. Members cannot edit or delete pool data but can create (post) pools.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, fullName]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: member1@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: Password123!
 *               fullName:
 *                 type: string
 *                 example: Member One
 *               username:
 *                 type: string
 *                 example: member_one
 *           examples:
 *             basic:
 *               value:
 *                 email: member1@example.com
 *                 password: Password123!
 *                 fullName: Member One
 *     responses:
 *       201:
 *         description: Member user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or duplicate email/username
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
 *       403:
 *         description: Forbidden for non-admin users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/',
  protect,
  authorizeRoles('admin'),
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').isLength({ min: 2, max: 100 }),
    body('username').optional().isLength({ min: 3, max: 50 }).matches(/^[a-zA-Z0-9_]+$/)
  ],
  createMember
);

module.exports = router;


