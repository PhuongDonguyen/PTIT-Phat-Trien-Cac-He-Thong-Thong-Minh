const express = require('express');
const { getAllMotorcycles, getMotorcyclesByType } = require('../controllers/motorcycleController');
const router = express.Router();

router.get('/motorcycles', getAllMotorcycles);
router.get('/motorcycles/:motorcycleType', getMotorcyclesByType);

module.exports = router;