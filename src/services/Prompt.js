const OpenAI = require("openai");
const openai = new OpenAI({
	apiKey: process.env.OPENAIKEY,
});

async function prompt(input)
{
    const prompt = `{
        "prompt": "Vui lòng thực hiện yêu cầu ${input}, thuyết minh từ 5-7 phút, chia thành từng đoạn dưới định dạng JSON như mô tả dưới đây:\n\n{\n  \"Title\": \"<Tiêu đề của thông tin về  ${input}>\",\n  \"Script\": [\n    {\n      \"text\": \"Đoạn 1\"\n    },\n    {\n      \"text\": \"Đoạn 2\"\n    },\n    ...\n    {\n      \"text\": \"Đoạn N\"\n    }\n  ]\n}"
      }`
    console.log(prompt)
    const params = OpenAI.Chat.ChatCompletionCreateParams = {
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      };
    const chatCompletion = OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
    console.log(chatCompletion.choices[0].message.content)
    return chatCompletion.choices[0].message.content
}

module.exports = { prompt };