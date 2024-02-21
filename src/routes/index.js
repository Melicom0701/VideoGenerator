const express = require ('express')
const router = express.Router()
const videoRoute = require('./video.route')




router.use('/video',videoRoute)



router.get("/", (req, res) => {
    res.json({ message: "Birth Cook" });
});

module.exports = router;

