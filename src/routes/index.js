const express = require ('express')
const router = express.Router()
//const {videoUpload } = require('../controllers/video.controller')
//router.post("/videoUpload")


router.get("/", (req, res) => {
    res.json({ message: "Birth Cook" });
});

module.exports = router;

