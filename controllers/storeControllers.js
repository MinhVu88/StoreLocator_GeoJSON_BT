const storeModel = require("../models/Store");

/**
 * @desc Get all stores
 * @route GET /api/v1/stores
 * @access Public
 */
const getStores = async (req, res, next) => {
  try {
    const stores = await storeModel.find({});

    res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "server error" });
  }
};

/**
 * @desc Create a store
 * @route POST /api/v1/stores
 * @access Public
 */
const createStore = async (req, res, next) => {
  try {
    const store = await storeModel.create(req.body);

    res.status(200).json({ success: true, data: store });
  } catch (error) {
    console.error(error);

    if (error.code === 11000)
      return res.status(400).json({ error: "Duplicate stores detected" });

    res.status(500).json({ error: "server error" });
  }
};

module.exports = { getStores, createStore };
