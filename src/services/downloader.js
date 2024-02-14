const fs = require('fs');
const path = require('path');
const util = require('util')
const axios = require('axios');

const downloadDir = './tmp/';
if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}


async function downloadFile(url, filePath) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    });

    const writer = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function downloadVideos(videoPaths) {
    const downloadedPaths = await Promise.all(videoPaths.map(async (vpath, index) => {
        const fileName = `video_${index + 1}.mp4`;
        const downloadPath = path.join(downloadDir, fileName);
        await downloadFile(vpath, downloadPath);
        return downloadPath;
    }));

    console.log(downloadedPaths);
    return downloadedPaths;
}

module.exports = { downloadVideos };