const express = require('express');
const { getColorOfDetailMotorcycle } = require('../controllers/colorController');
const router = express.Router();

router.get('/color', getColorOfDetailMotorcycle);

module.exports = router;