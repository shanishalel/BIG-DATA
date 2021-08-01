const path = require('path');
const RedisReciver = require('../Redis/RedisReciver');
const express = require('express');
const router = express.Router();

router.get('/dashboard', RedisReciver.get_sections);

module.exports = router;