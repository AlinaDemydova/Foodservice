const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/clientMenu');

// http://localhost:4200/client/menu {GET}
router.get('/', MenuController.getMenu);

module.exports = router;