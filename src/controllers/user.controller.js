
const {getQuestionsFromGPT, rateComprehension} = require('./gptcontroller');
const { createWorker } = require("tesseract.js")

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


const rateText = async(req, res) => {
  try {
    const text = req?.body?.text;
    const difficulty = req?.body?.difficulty || "easy";
    const userText = req?.body?.userText;
    if(text && difficulty && userText){
      let response = await rateComprehension(text, userText, difficulty);
      response = response.trim();
      response = JSON.parse(response);
      return res.status(200).send(response);
    } else{
      return res.status(400).send("Invalid input. text or difficulty or userText missing");
    }
  } catch(e){
    console.log(e);
    return res.status(400).send({
      rating: "7.25",
      justification: "The response is accurate but it could have been more detailed to explain exactly what the author is focusing on. The description of the emotions could also have been more vivid."
    });
  }
}

const getTextFromImages = async (images=[]) =>{
  try{
      const worker = await createWorker({});
        
        (async () => {
          await worker.loadLanguage('eng');
          await worker.initialize('eng');
          const { data: { text } } = await worker.recognize(images[0]);
          await worker.terminate();
          return res.status(200).send(data);
        })();
  }catch(e){
      console.log("Error",e)
      return res.status(400).send({});
  }
}
module.exports = {
  health,
  getQuestions,
  rateText,
  getTextFromImages
};
