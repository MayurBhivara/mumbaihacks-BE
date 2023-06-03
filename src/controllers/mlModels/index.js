

const {Configuration, OpenAIApi} = require("openai");

const openai = new OpenAIApi(
  new Configuration({ 
    apiKey: process.env.API_KEY
  }
  )
);

module.exports.GPT4 = async (message)=> {
    const {data} = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 300
      });

    const response = data?.choices[0]?.text?.trim();

  return response;
} 