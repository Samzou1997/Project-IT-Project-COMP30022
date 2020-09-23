const express   = require('express')
const router    = express.Router()

const SendController   = require('../controllers/ResetController')

router.get('/', ResetController.resetpage)
router.post('/reset', ResetController.emailTo)

module.exports = router