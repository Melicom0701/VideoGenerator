//merge audio into video 
//get video and audio in tmp folder
//cut video into audio length
//videoPath merge into audioPath.mp3
//let's code

const fs = require('fs');
const path = require('path');
const util = require('util')
const tmpDir = './tmp/';
const exec = util.promisify(require('child_process').exec);
async function getAudioDuration(audioPath) {
    const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${audioPath}`;
    const { stdout } = await exec(command);
    return parseFloat(stdout);
}
async function handleVideo(videoPath,length)
{
    const output = videoPath.split('.').slice(0, -1).join('.') + '.avi';
    if (fs.existsSync(output)) {
        fs.unlinkSync(output);
    }

    const command = `ffmpeg -ss 00:00:00 -to ${length} -i ${videoPath} -c copy ${output}`;

    console.log('executing command:', command)
    await exec(command);


    return output;
    
   // return exec(command);
}
async function Video_Audio(videoPath, audioPath, output) {
    const audioDuration = await getAudioDuration(audioPath);
    const handledVideo = await handleVideo(videoPath,audioDuration);
    if (fs.existsSync(output)) {
        fs.unlinkSync(output);
    }
    const command = `ffmpeg -i ${handledVideo} -i ${audioPath} -c:v copy -c:a aac -strict experimental -map 0:v:0 -map 1:a:0 ${output}
    `
    console.log(command)
    return exec(command);
}

module.exports = { Video_Audio};