var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which is a JavaScript Data Type?',
        choice1: 'lines',
        choice2: 'string',
        choice3: 'box',
        choice4: 'array',
        answer: 2,
    },
    {
        question:
            "What is 'this' keyword in JavaScript?",
        choice1: " 'This' refers to the object from where it was called.",
        choice2: "'this' defines a variable ",
        choice3: "'this' is used to create a function",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Which one is a looping structure in JavaScript?",
        choice1: "loop",
        choice2: "const",
        choice3: "for",
        choice4: "this",
        answer: 3,
    },
 
    {
        question: "how long does it take to learn everything about coding ?",
        choice1: "one million years",
        choice2: "1 week after figuring out how to do HTML",
        choice3: "3 years of coding ",
        choice4: "Its impossible but hard work and tissues will get you far ",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()