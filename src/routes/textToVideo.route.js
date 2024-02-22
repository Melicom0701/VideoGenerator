const express = require ('express')
const router = express.Router()
const ttvController = require('../controllers/textToVideo.controller')


router.post("/", ttvController.ttv);


module.exports = router;

