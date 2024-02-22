const express = require ('express')
const router = express.Router()
const videoRoute = require('./video.route')
const textToVideoRoute = require('./textToVideo.route.js')




router.use('/video',videoRoute)
router.use('/textToVideo',textToVideoRoute)

router.get("/", (req, res) => {
    res.json({ message: "Birth Cook" });
});

module.exports = router;

