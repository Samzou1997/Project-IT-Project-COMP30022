const express   = require('express');
const router    = express.Router();

const ShareController   = require('../controllers/ShareController');

router.get('/:email', ShareController.ShareHome);

module.exports = router;