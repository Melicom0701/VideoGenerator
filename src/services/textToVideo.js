const fs = require('fs');
const path = require('path');
const util = require('util')
const tmpDir = './tmp/';
const media = require('./media');
const speech = require('./speech');
const AISearch = require('./AISearch');
const exec = util.promisify(require('child_process').exec);
const downloader = require('./downloader');
const video = require('./video');
const { uploadToBlobStorage } = require('../config/blob');
async function textToVideo(script) {
  let slider = [];
  let audio = [];
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  for await (let [index, item] of script.Script.entries())
  {

    const path = `./tmp/${index}.mp3`;
    await speech.AzureTTS(item.text, path)
    audio.push(path);
    const audioDuration = await speech.getAudioDuration(path);
    slider.push(audioDuration);
  }


  let mapper = {};
  let downloadItem = [];
  for await (let [index, item] of script.Script.entries())
  {
    const searchItem = await AISearch.PerformSearch(item.text);
    if (searchItem.length == 1) {
      mapper[searchItem[0].id] = parseInt(1);
      downloadItem[index] = searchItem[0].url;
    }
    if (searchItem.length > 1) {
      console.log(searchItem)
      //select the item that least appear in the mapper
      let min = 100000;
      let minIndex = 0;
      for (let i = 0; i < searchItem.length; i++) {
        let id = searchItem[i].video_id;
        if (mapper[id] == undefined) {
          mapper[id] = parseInt(1);
          downloadItem[index] = searchItem[i].url;
          break;
        }
        if (mapper[id] < min) {
          min = mapper[id];
          minIndex = i;
        }
        mapper[searchItem[minIndex].video_id] = parseInt(mapper[searchItem[minIndex].video_id]) + 1;
        downloadItem[index] = searchItem[minIndex].url;
      }
    }
    if (searchItem.length == 0) {
      downloadItem[index] = 'https://kmelicom.blob.core.windows.net/videos/Blank Video.mp4';
    }
   

  }
  const videoPaths = await downloader.downloadVideos(downloadItem);


  const videoAudioPath = videoPaths.map(async (path, index) => {
    const output = `tmp/video_audio_${index}.mp4`;
    if (fs.existsSync(output)) {
      fs.unlinkSync(output);
    }
    await media.Video_Audio(path, audio[index], output);
    return output;
  });   
  
   
    Promise.all(videoAudioPath).then((videoAudioPath) => {
        const containerName = process.env.HANDLED_CONTAINER;
        console.log(videoAudioPath);
        //upload to blob storage
        const videoAudioPathBlob = videoAudioPath.map(async (path, index) => {
            const output = `video_audio_${index}.mp4`;
            const stream = fs.ReadStream(path);
            const cloudDir = await uploadToBlobStorage(stream, containerName,output);
            return cloudDir.url;
        });
        Promise.all(videoAudioPathBlob).then((videoAudioPathBlob) => {
            console.log(videoAudioPathBlob);
        });
      //  console.log(videoAudioPathBlob);
    });
    
}



module.exports = {textToVideo};