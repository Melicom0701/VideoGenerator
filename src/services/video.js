const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp')
var MP4Box = require('mp4box');
const util = require('util')
const downloadDir = './tmp/';
const pathTofmpeg = require('ffmpeg-static');
const exec = util.promisify(require('child_process').exec);

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}


const videoEncoder = 'h264';
const outputfile = 'output.mp4';

const modifyFrame = async (frame)=>{
    let newHeight = 16*frame.bitmap.width/9;
    newHeight = newHeight%2 == 0? newHeight : newHeight+1;
}
const checkProgress = (currentFrame, totalFrames) => {
    const progress = (currentFrame / totalFrames) * 100;
    console.log(`Progress: ${progress.toFixed(2)}%`);
};

async function addAudioToVideo(videoPath, audioPath) {
    const video = ffmpeg(videoPath);
    const audio = ffmpeg(audioPath);
    const outputPath = path.join(downloadDir, outputfile);

    video
        .on('progress', (progress) => checkProgress(progress.frames, progress.targetSize))
        .input(audio)
        .outputOptions('-c:v', videoEncoder)
        .output(outputPath)
        .on('end', () => console.log('Finished processing'))
        .run();

}

async function mergeVideo (videoPaths,outputPath) {


    let mergeList = ''; 
    videoPaths.map((path, index) => {
        mergeList += `${path}|`;
    });
    mergeList = mergeList.slice(0, -1);
    console.log(mergeList)
    
    try {        
        const command = `ffmpeg \
                            -i "concat:${mergeList}" \
                            -c:a copy \
                            -c:v copy \
                            ${outputPath}
                            `;
        console.log('executing command:', command)
        exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.error(`stderr: ${stderr}`);
              return;
            };});
    } catch (error) {
        console.error('Error:', error);
    }

}

async function getVideoDuration(videoPath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                reject(err);
            }
            resolve(metadata.format.duration);
        });
    });
}
async function lengthenTheVideo(videoPath, duration) {
    const outputPath = path.join(downloadDir, 'lengthened.mp4');
    const video = ffmpeg(videoPath);
    video
        .outputOptions('-filter:v', `setpts=${duration}*PTS`)
        .output(outputPath)
        .on('end', () => console.log('Finished processing'))
        .run();
    return outputPath;
}

module.exports = {getVideoDuration, mergeVideo };

