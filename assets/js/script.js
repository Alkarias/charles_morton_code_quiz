//grabbing all of the elements of the start screen
var containerEl = document.querySelector('#container'); 
var h1El = document.getElementById('header');
var description = document.getElementById('description');
var btnStart = document.getElementById('startBtn');

//this is the setup for the questions screen
var ansForm = document.createElement("form");
ansForm.setAttribute('id', 'answers');  
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");

//clones the question list so that the original is unaltered by .splice()
var listClone = questionList.questions;

//variable used to store the score from the current attempt
var score = 0;

//when the start button is pressed, change the display to show
//the multiple choice questions
btnStart.addEventListener('click', function() {
    //unrenders the unnecessary objects from the start screen
    description.setAttribute('style', 'display:none');
    btnStart.setAttribute('style', 'display:none');
    //picks the question that is displayed
    nextQuestion();
    //appends the needed elements into the display
    containerEl.appendChild(ansForm);
    ansForm.appendChild(btn1);
    ansForm.appendChild(btn2);
    ansForm.appendChild(btn3);
    ansForm.appendChild(btn4);
});

btn1.addEventListener('click', buttonClick);
btn2.addEventListener('click', buttonClick);
btn3.addEventListener('click', buttonClick);
btn4.addEventListener('click', buttonClick);

function buttonClick(event) {
    event.preventDefault();
    checkCorrect(event.target);
    nextQuestion();
}

function nextQuestion() {
    //chooses a random question from the cloned question list
    // var questionIndex = Math.floor(Math.random() * listClone.length);
    var questionIndex = 0;
    //removes the chosen question from the list so it cannot be picked again
    //and allows reference to the chosen question
    var questionNum = listClone.splice(questionIndex,1); //returns an array with a length of 1
    //applies the answers to a random button
    var answers = shuffle(questionNum[0]);

    //updates the text to display the new question
    h1El.textContent = questionNum[0].question;
    btn1.textContent = answers[0];
    btn2.textContent = answers[1];
    btn3.textContent = answers[2];
    btn4.textContent = answers[3];
}

function shuffle(item) { //shuffles the answers so they are placed onto random buttons
    var answersTemp = item.answers;
    var answers = [];
    var answerSet = false;
    for (var i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * answersTemp.length);
        answers.push(answersTemp[index]);
        answersTemp.splice(index, 1);
        if (index == 0 && !answerSet) { //tells which button is holding the correct answer
            btnReset(i);
            answerSet = true;
        }
    }
    return answers;
}

function btnReset(index) {
    //resets which button is correct
    btn1.setAttribute('data-bool', 'false');
    btn2.setAttribute('data-bool', 'false');
    btn3.setAttribute('data-bool', 'false');
    btn4.setAttribute('data-bool', 'false');

    //this is temporary for matching correct answer to the data attribute
    btn1.setAttribute('style', 'background-color:#764faf');
    btn2.setAttribute('style', 'background-color:#764faf');
    btn3.setAttribute('style', 'background-color:#764faf');
    btn4.setAttribute('style', 'background-color:#764faf');

    //communicates to the button that it is holding the correct answer
    window["btn" + (index+1)].setAttribute('data-bool', 'true');
    window["btn" + (index+1)].setAttribute('style', 'background-color:green');
}

function checkCorrect(target) {
    if (target.getAttribute('data-bool') == 'true') {
        score++;
    } else {
        // time -= 5;
    }
    console.log(score);
}

