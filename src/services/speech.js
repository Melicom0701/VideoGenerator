require("dotenv").config();
const fs = require("fs");
const path = require("path");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const exec = require('util').promisify(require('child_process').exec);
const OpenAI = require("openai");
const openai = new OpenAI({
	apiKey: process.env.OPENAIKEY,
});
const _output = path.resolve("./output.mp3");

const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_API_KEY, "eastus");
speechConfig.speechSynthesisVoiceName = "vi-VN-HoaiMyNeural";

async function AzureTTS(_input, _output) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(_output)) {
            fs.unlinkSync(_output);
        }

        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(_output);
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.speakTextAsync(_input,
            (result) => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("Synthesis finished.");
                    resolve();
                } else {
                    const errorMessage = "Speech synthesis canceled, " + result.errorDetails +
                        "\nDid you update the subscription info?";
                    console.error(errorMessage);
                    reject(new Error(errorMessage));
                }
                synthesizer.close();
            },
            (err) => {
                console.trace("Error - " + err);
                reject(err);
                synthesizer.close();
            });

        console.log("Now synthesizing to: " + _output);
    });
}

async function TTS(_input,_output) {
	try {
		console.log("Speech synthesis initializing.");
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: "onyx",
			input: _input,
		});
        console.log(_input)
		if (fs.existsSync(_output)) {
			fs.unlinkSync(_output);
		}

		const buffer = Buffer.from(await mp3.arrayBuffer());
		await fs.promises.writeFile(_output, buffer);
		console.log("Speech synthesis complete.");
	} catch (error) {
		console.log("Speech synthesis failed.");
		console.error(error);
	}
}
async function getAudioDuration(audioPath) {
    const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${audioPath}`;
    const  result = await exec(command);
    return parseFloat(result.stdout);
}


module.exports = {TTS, AzureTTS,getAudioDuration};