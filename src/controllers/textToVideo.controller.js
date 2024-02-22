const fs = require('fs');
const {textToVideo} = require('../services/textToVideo');
const {prompt } = require('../services/Prompt');
async function ttv(req, res)
{ 
    console.log(req.body.script)
    const PromptResult = await prompt(req.body.script);
    const script = await JSON.parse(PromptResult);
    const videoPaths = await textToVideo(script);
    res.status(200).json({videoPaths}); 
  //  console.log(script.Script)
}
module.exports = { ttv }