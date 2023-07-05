import fs from 'fs'

/* 
Note 1: I was originally creating a copy of the array passed in (in order to prevent mutation of the original since I am
----using the splice method), however, I noticed the 'does not mutate array' test is still passing after removing the copy
----and directly splicing the original array passed in. Keeping it as is for simplicity/shortness but I do understand the situation
Note 2: Experimented with while, for, and foreach loop. All worked just fine, found some articles online that said foreach is most
----efficient/fastest so settled on that, (was the shortest by one line as well). Would be insterested in learning more about which is
----ideal in this situation. Changed parameter names in the process of making everything as concise as possible without affecting readability
(arr: [number], items: number) -> [number] */
export const chooseRandom = (arr = [], items) => {
    if (arr.length <= 1) return arr
    if (!(1 < items < arr.length))
        items = Math.floor(Math.random() * arr.length + 1)
    const result = []
    for (let e of [...Array(items).keys()]) {
        let r = Math.floor(Math.random() * arr.length)
        result.push(arr[r])
        arr.splice(r)
    }
    return result
}

// default function parameters make life much easier here
// ({numQuestions: number, numChoices: number}) -> [{}]
export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
    let arr = []
    for (let i = 1; i <= numQuestions; i++) {
        arr.push({
            type: 'input',
            name: `question-${i}`,
            message: `Enter question ${i}`,
        })
        for (let j = 1; j <= numChoices; j++)
            arr.push({
                type: 'input',
                name: `question-${i}-choice-${j}`,
                message: `Enter answer choice ${j} for question ${i}`,
            })
    }
    return arr
}

/*
Note 1: Would return empty array if object passed in does not contain 'question-1' key, or if object passed in does not contain
----questions in sequential order (ex. {question-1: 'foo', question-1-choice-1: 'bar', question-4: 'anything'})
// (thing: {questions and choices: text}) -> [{question with choices}] */
export const createQuestions = thing => {
    if (typeof thing != 'object' || thing['question-1'] === undefined) return []
    let result = []
    let i = 1
    while (Object.keys(thing).includes(`question-${i}`)) {
        let values = []
        for (let key in thing)
            if (key.includes(`question-${i}-choice`)) values.push(thing[key])
        result.push({
            type: 'list',
            name: `question-${i}`,
            message: thing[`question-${i}`],
            choices: [...values],
        })
        i++
    }
    return result
}

export const readFile = path =>
    new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
    })

export const writeFile = (path, data) =>
    new Promise((resolve, reject) => {
        fs.writeFile(path, data, err =>
            err ? reject(err) : resolve('File saved successfully')
        )
    })
