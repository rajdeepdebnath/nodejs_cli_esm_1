#! /usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import figlet from 'figlet';
import Configstore from 'configstore';
import { getQuizData,  displayQuizData } from './src/quiz.js';
import {program} from 'commander';
import pkg from './package.json' assert { type: "json" };
import inquirer from 'inquirer';

const config = new Configstore(pkg.name);

let apiKey = config.get('apiKey');

if(!apiKey){
    let input = await inquirer.prompt([{
        type:'input',
        name:'apiKey',
        message: `${chalk.yellow('API Key')} ${chalk.italic('(contact author for valid api key): ')}`,
        validate: input => input.length > 0 ? true : "API Ket is required"
    }]);

    apiKey = input.apiKey.trim();
}

console.log(gradient('green', 'yellow')('>> Welcome to Javascript quiz!!! <<'));

let quizData = await getQuizData(apiKey);
let score = await displayQuizData(quizData);

console.log(chalk.bgGreen('-: SCORE :-'));
console.log(gradient('cyan', 'red')(figlet.textSync(score)));

chalkAnimation.rainbow('Game over!!!');