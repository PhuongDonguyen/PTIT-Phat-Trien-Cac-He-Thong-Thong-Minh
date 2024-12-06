const express = require('express');
const router = express.Router();
const { getAllMotorcycleTypes, getMotorcycleTypeById } = require('../controllers/motorcycleTypesController');

router.get('/motorcycleTypes', getAllMotorcycleTypes);
router.get('/motorcycleTypes/:typeId', getMotorcycleTypeById);

module.exports = router;