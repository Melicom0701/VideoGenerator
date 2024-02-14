require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");
const path = require("path");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const openai = new OpenAI({
	apiKey: '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',
});
const _output = path.resolve("./output.mp3");


async function AzureTTS(_input,_output) {
        const speechConfig = sdk.SpeechConfig.fromSubscription("7efefdfe8aa14a00b8f8a44be6d296cb", "eastus");
        speechConfig.speechSynthesisVoiceName = "vi-VN-HoaiMyNeural";
        var audioConfig = sdk.AudioConfig.fromAudioFileOutput(_output);
        var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        // start the synthesizer and wait for a result.
        synthesizer.speakTextAsync(_input,
                function (result) {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log("synthesis finished.");
            } else {
                console.error("Speech synthesis canceled, " + result.errorDetails +
                        "\nDid you update the subscription info?");
            }
            synthesizer.close();
            synthesizer = undefined;
        },
                function (err) {
            console.trace("err - " + err);
            synthesizer.close();
            synthesizer = undefined;
        });
        console.log("Now synthesizing to: " + _output);
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


module.exports = {TTS, AzureTTS}