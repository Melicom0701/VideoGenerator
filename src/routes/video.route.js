const express = require ('express')
const router = express.Router()
const videoController = require('../controllers/video.controller')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })



router.post("/", upload.single('stream'),videoController.videoUpload);



router.get("/", (req, res) => {
    res.json({ message: "Birth Cook" });
});


module.exports = router;

