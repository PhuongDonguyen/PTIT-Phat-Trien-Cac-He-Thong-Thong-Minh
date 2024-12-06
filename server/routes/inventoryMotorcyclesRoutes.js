const express = require('express');
const router = express.Router();
const { getAllInventoryMotorcycles, getInventoryMotorcyclesByType, getDetailInventoryMotorcycle } = require('../controllers/inventoryMotorcyclesController');

router.get('/inventoryMotorcycles', getAllInventoryMotorcycles);
router.get('/inventoryMotorcycles/:maloai', getInventoryMotorcyclesByType);
router.get('/detailInventoryMotorcycles', getDetailInventoryMotorcycle);

module.exports = router;