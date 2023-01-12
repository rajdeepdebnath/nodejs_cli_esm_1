
import { createSpinner } from 'nanospinner';
import contentful from 'contentful';
import chalk from 'chalk';
import inquirer from 'inquirer';

export async function getQuizData(){

    const spinner = createSpinner('fetching quiz data...');

    try {
        const client = contentful.createClient({
                space: 'f1vak80ez8so',
                environment: 'master', // defaults to 'master' if not set
                accessToken: process.env.CONTENTFUL_API_KEY
            })
	
        spinner.start();
        let response = await client.getEntries({
            content_type: 'javascriptQuiz'
          });
        spinner.success();
	
        return response.items.map(i => i.fields);
        //console.log(JSON.stringify(response.items.map(i => i.fields)));
    }catch(err){
        spinner.error("quiz data fetch error");
        console.log(chalk.bgRed(err.message));
        console.log(err);
    }
}


export async function displayQuizData(quizData){
    let score = 0;
    for(let data of quizData){
        let input = await inquirer.prompt({
            type: 'list',
            name:'answer',
            message: data.question,
            choices: data.options
        });
    
        if(input.answer === data.answer){
            score++;
            console.log(chalk.bgGreen('Correct!!!'));
        }else{
            console.log(chalk.bgRed('Incorrect!!!'));
        }
    
        console.log(chalk.cyan.underline(`Score: ${score}`));
        console.log(chalk.yellow(`The answer is: ${data.answer}`));
        console.log("");

        let nextQuestion = await inquirer.prompt({
            type:'confirm',
            name:'val',
            message:'Continue? ',
            default:true
        });

        if(!nextQuestion.val){
            return score;
        }
    }

    return score;
}