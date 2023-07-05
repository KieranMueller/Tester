"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = exports.readFile = exports.createQuestions = exports.createPrompt = exports.chooseRandom = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// (array: [number], numItems: number) -> [?]
var chooseRandom = function chooseRandom() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var numItems = arguments.length > 1 ? arguments[1] : undefined;
  var arrCopy = _toConsumableArray(array);
  if (array.length < 2) return array;
  if (numItems < 1 || numItems > array.length || numItems === undefined) numItems = Math.floor(Math.random() * array.length + 1);
  var result = [];
  var i = 0;
  while (i < numItems) {
    var r = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy[r]);
    i++;
  }
  return result;
};

// (thing: {numQuestions: number, numChoices: number}) -> [{}]
exports.chooseRandom = chooseRandom;
var createPrompt = function createPrompt() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$numQuestions = _ref.numQuestions,
    numQuestions = _ref$numQuestions === void 0 ? 1 : _ref$numQuestions,
    _ref$numChoices = _ref.numChoices,
    numChoices = _ref$numChoices === void 0 ? 2 : _ref$numChoices;
  var arr = [];
  for (var i = 1; i <= numQuestions; i++) {
    arr.push({
      type: 'input',
      name: "question-".concat(i),
      message: "Enter question ".concat(i)
    });
    for (var j = 1; j <= numChoices; j++) arr.push({
      type: 'input',
      name: "question-".concat(i, "-choice-").concat(j),
      message: "Enter answer choice ".concat(j, " for question ").concat(i)
    });
  }
  return arr;
};

// (thing: {questions and choices: text}) -> [{question with choices}]
exports.createPrompt = createPrompt;
var createQuestions = function createQuestions(thing) {
  if (_typeof(thing) != 'object' || thing['question-1'] === undefined) return [];
  var result = [];
  var i = 1,
    j = 2,
    k = 0,
    h = 1;
  while (k < 2) {
    result.push({
      type: 'list',
      name: "question-".concat(i),
      message: thing["question-".concat(i)],
      choices: [thing["question-".concat(i, "-choice-").concat(h)], thing["question-".concat(i, "-choice-").concat(j)]]
    });
    i++;
    k++;
  }
  return result;
};
exports.createQuestions = createQuestions;
var readFile = function readFile(path) {
  return new Promise(function (resolve, reject) {
    _fs["default"].readFile(path, function (err, data) {
      return err ? reject(err) : resolve(data);
    });
  });
};
exports.readFile = readFile;
var writeFile = function writeFile(path, data) {
  return new Promise(function (resolve, reject) {
    _fs["default"].writeFile(path, data, function (err) {
      return err ? reject(err) : resolve('File saved successfully');
    });
  });
};
exports.writeFile = writeFile;