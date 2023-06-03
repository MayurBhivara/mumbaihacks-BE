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


module.exports.rateComprehension = async (message, userText, difficulty) => {

    const prompt = `
    The passage is: ${message}

    Judge my ability to comprehend the above. Give response as a rating out of 10 based on the below format: 
    "{
        "rating": "8.65",
        "justification": "Reason"
    }"
    The justification key should contain the reason for the rating. Also say what can be improved to get a perfect 10 rating. 
    
    The difficulty I have chosen is ${difficulty}.
    
    My comprehension:
    ${userText}
    `
    return  await GPT4(prompt);
};