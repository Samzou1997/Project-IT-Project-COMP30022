const express   = require('express')
const router    = express.Router()

const ResetController   = require('../controllers/ResetController')

router.get('/', ResetController.resetpage)
router.post('/reset', ResetController.emailTo)

module.exports = router