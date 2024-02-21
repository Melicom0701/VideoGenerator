const fs = require('fs');
const {textToVideo} = require('../services/textToVideo');

async function ttv(req, res)
{
    const script = JSON.parse(req.body.script);
   
    const videoPaths = await textToVideo(script);
    res.status(200).json({videoPaths}); 
  //  console.log(script.Script)
}
module.exports = { ttv }