const express   = require('express')
const router    = express.Router()

const ErrorRouter   = require('../controllers/ErrorController')

router.post('/404', ErrorRouter.not_found_404)
router.get('/404', ErrorRouter.not_found_404)

module.exports = router