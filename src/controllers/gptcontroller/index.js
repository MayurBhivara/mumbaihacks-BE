const {GPT4} = require('../mlModels');

module.exports.getQuestionsFromGPT = async (message, difficulty) => {

const prompt = `Generate 5 ${difficulty} level MCQ questions based on the below: 
The generated response should be in the following format (Json): 
{
  "questions":  ["Question 1? ", "Question 2?"],
  "options": [ {"A":"some data", "B": "some data" } ],
  "answers": ["A","B"]
}
  Here is the passage: 
      "${message}";
  `;

  return  await GPT4(prompt);
};