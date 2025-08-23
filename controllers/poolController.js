const Pool = require('../models/Pool');

// @desc    Get all pools
// @route   GET /api/pools
// @access  Public
const getPools = async (req, res) => {
  try {
    const pools = await Pool.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: pools.length,
      data: pools
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single pool
// @route   GET /api/pools/:id
// @access  Public
const getPool = async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.id);
    
    if (!pool) {
      return res.status(404).json({
        success: false,
        message: 'Pool not found'
      });
    }

    res.status(200).json({
      success: true,
      data: pool
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Pool not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new pool
// @route   POST /api/pools
// @access  Public
const createPool = async (req, res) => {
  try {
    const pool = await Pool.create(req.body);
    
    res.status(201).json({
      success: true,
      data: pool
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update pool
// @route   PUT /api/pools/:id
// @access  Public
const updatePool = async (req, res) => {
  try {
    const pool = await Pool.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!pool) {
      return res.status(404).json({
        success: false,
        message: 'Pool not found'
      });
    }

    res.status(200).json({
      success: true,
      data: pool
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Pool not found'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete pool
// @route   DELETE /api/pools/:id
// @access  Public
const deletePool = async (req, res) => {
  try {
    const pool = await Pool.findByIdAndDelete(req.params.id);
    
    if (!pool) {
      return res.status(404).json({
        success: false,
        message: 'Pool not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pool deleted successfully'
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Pool not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Search pools by home owner name or city
// @route   GET /api/pools/search?q=searchTerm
// @access  Public
const searchPools = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const pools = await Pool.find({
      $or: [
        { homeOwnerName: { $regex: q, $options: 'i' } },
        { city: { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pools.length,
      data: pools
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getPools,
  getPool,
  createPool,
  updatePool,
  deletePool,
  searchPools
};
