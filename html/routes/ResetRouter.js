const express   = require('express');
const router    = express.Router();

const ResetController   = require('../controllers/ResetController');

router.get('/', ResetController.resetpage);
router.post('/Reset', ResetController.emailTo);
router.get('/Resetting/:token', ResetController.Resetpd);
router.post('/ResettingPD', ResetController.ResettingPD);

module.exports = router;