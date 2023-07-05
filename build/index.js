"use strict";

var _vorpal = _interopRequireDefault(require("vorpal"));
var _inquirer = _interopRequireDefault(require("inquirer"));
var _lib = require("./lib.mjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var prompt = _inquirer["default"];
var cli = (0, _vorpal["default"])();
var askForQuestions = [{
  type: 'input',
  name: 'numQuestions',
  message: 'How many questions do you want in your quiz?',
  validate: function validate(input) {
    var pass = input.match(/^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/);
    return pass ? true : 'Please enter a valid number!';
  }
}, {
  type: 'input',
  name: 'numChoices',
  message: 'How many choices should each question have?',
  validate: function validate(input) {
    var pass = input.match(/^(?:[2-4]|0[2-4]|4)$/);
    return pass ? true : 'Please enter a valid number!';
  }
}];
var createQuiz = function createQuiz(title) {
  return prompt(askForQuestions).then(function (answer) {
    return (0, _lib.createPrompt)(answer);
  }).then(function (promptArray) {
    return prompt(promptArray);
  }).then(function (answer) {
    return (0, _lib.createQuestions)(answer);
  }).then(function (quiz) {
    return (0, _lib.writeFile)(title, JSON.stringify(quiz));
  }).then(function () {
    return console.log('Quiz created successfully.');
  })["catch"](function (err) {
    return console.log('Error creating the quiz.', err);
  });
};
var takeQuiz = function takeQuiz(title, output) {
  return (0, _lib.readFile)(title).then(function (quizData) {
    return JSON.parse(quizData);
  }).then(function (quiz) {
    return prompt(quiz);
  }).then(function (answers) {
    return (0, _lib.writeFile)(output, JSON.stringify(answers));
  })["catch"](function (err) {
    return console.log('Error taking the quiz', err);
  });
};
var takeRandomQuiz = function takeRandomQuiz(quizzes, output, n) {
  return Promise.all(quizzes.map(function (quizName) {
    return (0, _lib.readFile)(quizName);
  })).then(function (quizDataArray) {
    return quizDataArray.flatMap(function (quizData) {
      return JSON.parse(quizData);
    });
  }).then(function (questions) {
    return (0, _lib.chooseRandom)(questions, n);
  }).then(function (randomQuestions) {
    return prompt(randomQuestions);
  }).then(function (answer) {
    return (0, _lib.writeFile)(output, JSON.stringify(answer));
  }).then(function () {
    return console.log('Random quiz answers saved successfully.');
  })["catch"](function (err) {
    return console.log('Error creating the random quiz.', err);
  });
};
cli.command('create <fileName>', 'Creates a new quiz and saves it to the given fileName').action(function (input, callback) {
  return createQuiz(input.fileName);
});
cli.command('take <fileName> <outputFile>', 'Loads a quiz and saves the users answers to the given outputFile').action(function (input, callback) {
  return takeQuiz(input.fileName, input.outputFile);
});
cli.command('random <outputFile> <fileNames...>', 'Loads a quiz or' + ' multiple quizes and selects a random number of questions from each quiz.' + ' Then, saves the users answers to the given outputFile').action(function (input, callback) {
  return takeRandomQuiz(input.fileNames, input.outputFile, Math.floor(Math.random() * 5));
});
cli.delimiter(cli.chalk['yellow']('quizler>')).show();