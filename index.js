#! /usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

console.log(chalk.bgGreen('hellooo'));
console.log(gradient('cyan', 'red')('Hello world!'));
chalkAnimation.rainbow('How are you!!!');