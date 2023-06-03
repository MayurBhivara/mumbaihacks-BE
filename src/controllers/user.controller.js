
const {getQuestionsFromGPT} = require('./gptcontroller');

const health = async (req, res) =>{
  return res.send({status:true});
}

const getQuestions = async (req, res) => {
  try {
    const text = req?.body?.text;
    const difficulty = req?.body?.difficulty || "easy";
    if(text){

        let response = await getQuestionsFromGPT(text, difficulty);
        // let response = `{  "questions":  ["Who is Humpty Dumpty?", "Why couldn't the king's horses and men put Humpty together again?", "What was the end result of Humpty's fall?", "What was Humpty sitting on when he fell?", "What did the king provide to help Humpty get back together?"],  "options": [ {"A":"A queen", "B": "An egg" }, {"A":"Humpty was too hurt to be put together again", "B": "Humpty was broken into too many pieces to put back together"}, {"A":"Humpty was saved", "B": "Humpty was killed"}, {"A":"A chair", "B": "A wall" }, {"A":"A magical spell", "B": "Horses and men"} ],  "answers": ["B","A","B","B","B"]}`
        response = response.trim();
        // const response = `{  "questions": ["In the nursery rhyme, who sat on a wall?", "What did all the King's Horses and Men not do?", "What happened to Humpty Dumpty?", "What caused Humpty Dumpty to fall?", "What phrase is used to describe what happened to Humpty Dumpty?"],   "options": [{"A": "The King", "B": "Put Humpty together again"}, {"A": "Joined Humpty together", "B": "Couldn't put Humpty together again"},  {"A": "He flew away", "B": "He had a great fall"}, {"A": "He was pushed", "B": "He jumped"}, {"A": "Humpty Dumpty had a great rise", "B": "Humpty Dumpty had a great fall"}],   "answers": ["B", "B", "B", "B", "B"]}`
      response = JSON.parse(response)

      const responseQuestions = response?.["questions"];
      const responseOptions = response?.["options"];
      const responseAnswers = response?.["answers"];
      
      const responseObj = {};
  
      for(let i=0; i<responseQuestions?.length; i++){
        responseObj[i+1] = {
          ques: responseQuestions[i],
          options: responseOptions[i],
          ans: responseAnswers[i],
          type: "mcq"
        }
      }
      return res.status(200).send(responseObj); 
    } else {
      return res.status(400).send('Text Cannot be empty');
    }
     
  } catch (e){
    console.log(e);
    return {};
  }
}

module.exports = {
  health,
  getQuestions
};
