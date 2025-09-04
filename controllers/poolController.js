const Pool = require('../models/Pool');

// @desc    Get all pools
// @route   GET /api/pools
// @access  Private
const getPools = async (req, res) => {
  try {
    const pools = await Pool.findAll();
    
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
// @access  Private
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
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new pool
// @route   POST /api/pools
// @access  Private
const createPool = async (req, res) => {
  try {
    const pool = await Pool.create(req.body, req.user?.id || null);
    
    res.status(201).json({
      success: true,
      data: pool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update pool
// @route   PUT /api/pools/:id
// @access  Private
const updatePool = async (req, res) => {
  try {
    const exists = await Pool.findById(req.params.id);
    
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: 'Pool not found'
      });
    }
    const pool = await Pool.update(req.params.id, req.body);
    
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
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete pool
// @route   DELETE /api/pools/:id
// @access  Private
const deletePool = async (req, res) => {
  try {
    const exists = await Pool.findById(req.params.id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: 'Pool not found'
      });
    }
    const deleted = await Pool.delete(req.params.id);
    if (!deleted) {
      return res.status(500).json({ success: false, message: 'Failed to delete pool' });
    }

    res.status(200).json({ success: true, message: 'Pool deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Search pools by home owner name or city
// @route   GET /api/pools/search?q=searchTerm
// @access  Private
const searchPools = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const pools = await Pool.search(q);

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
