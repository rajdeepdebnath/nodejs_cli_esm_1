#! /usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import figlet from 'figlet';
import * as dotenv from 'dotenv';
import { getQuizData,  displayQuizData } from './src/quiz.js';


dotenv.config({
    path: './.env.development'
});

console.log(gradient('green', 'yellow')('>> Welcome to Javascript quiz!!! <<'));

let quizData = await getQuizData();
let score = await displayQuizData(quizData);

console.log(chalk.bgGreen('-: SCORE :-'));
console.log(gradient('cyan', 'red')(figlet.textSync(score)));

chalkAnimation.rainbow('Game over!!!');