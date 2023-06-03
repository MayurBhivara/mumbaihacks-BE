

const {Configuration, OpenAIApi} = require("openai");

const openai = new OpenAIApi(
  new Configuration({ 
    apiKey: "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"    
    // apiKey: "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"
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