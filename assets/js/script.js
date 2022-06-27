//clones the question list so that the original is unaltered by .splice()
var listClone = [];

//variable used to store the score from the current attempt
var score = 0;
var timeRemaining = 60; //original time was 60 seconds

//when the start button is pressed, change the display to show
//the multiple choice questions
btnStart.addEventListener('click', function() {
    listClone = questionList.questions;
    containerEl.removeChild(description);
    containerEl.removeChild(btnStart);
    nextQuestion();
    quizScreen(); //switches the display to show question and answers
    startTimer();  //starts the time clock
});

btn1.addEventListener('click', buttonClick);
btn2.addEventListener('click', buttonClick);
btn3.addEventListener('click', buttonClick);
btn4.addEventListener('click', buttonClick);

iptSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    var highscores = JSON.parse(localStorage.getItem(highscores));
});

function buttonClick(event) {
    event.preventDefault(); //stops the form from resetting
    checkCorrect(event.target); //checks if the user clicked the correct answer
    nextQuestion(); // displays the next question
}

function nextQuestion() {
    //if all of the questions have been answered, end the quiz
    if (listClone.length === 0) scoreScreen();
    //chooses a random question from the cloned question list
    // var questionIndex = Math.floor(Math.random() * listClone.length);
    var questionIndex = 0;
    //assigns the chosen question to a variable for easy reference
    var questionNum = listClone[questionIndex];
    //removes the chosen question from the list so it cannot be picked again
    listClone.splice(questionIndex,1); //returns an array with a length of 1
    //applies the answers to a random button
    var answers = shuffle(questionNum);

    //updates the text to display the new question
    h1El.textContent = questionNum.question;
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
        var index = Math.floor(Math.random() * answersTemp.length); //
        answers.push(answersTemp[index]); 
        answersTemp.splice(index, 1); //removes the question from the pool of questions
        if (index == 0 && !answerSet) { //tells which button is holding the correct answer
            btnReset(i);
            answerSet = true; // ensures that this can only occur once per question
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

    //communicates to the button that it is holding the correct answer
    window["btn" + (index+1)].setAttribute('data-bool', 'true');

    //this is temporary for matching correct answer to the data attribute
    btn1.setAttribute('style', 'background-color:#764faf');
    btn2.setAttribute('style', 'background-color:#764faf');
    btn3.setAttribute('style', 'background-color:#764faf');
    btn4.setAttribute('style', 'background-color:#764faf');
    window["btn" + (index+1)].setAttribute('style', 'background-color:green');
}

function checkCorrect(target) {
    // if the user clicks the correct answer, they get score added
    // if they click the wrong button, they lose time.
    if (target.getAttribute('data-bool') == 'true') {
        score++;
    } else {
        timeRemaining -= 5;
    }
    console.log(score);
}

function startTimer() {
    timeEl.textContent = "Time Remaining: " + timeRemaining;

    var timerInterval = setInterval(function() { //starts a loops that iterates every 1000ms
        timeRemaining--;//decrements the time variable
        timeEl.textContent = "Time Remaining: " + timeRemaining;//updates the time display
         
        if (timeRemaining === 0) {
            clearInterval(timerInterval); //stop the loop
            timeRemaining = 60; // resets the clock
            timeEl.textContent = ""; //hides the time display
            scoreScreen(); //displays the score recording screen
        }
    }, 1000);
}

function quizScreen() {
    containerEl.appendChild(ansForm);
    ansForm.appendChild(btn1);
    ansForm.appendChild(btn2);
    ansForm.appendChild(btn3);
    ansForm.appendChild(btn4);
}

function scoreScreen() {
    containerEl.removeChild(ansForm);
    containerEl.appendChild(finalScore);
    containerEl.appendChild(scoreForm);
    scoreForm.appendChild(lblEl);
    scoreForm.appendChild(iptName);
    scoreForm.appendChild(iptSubmit);
    h1El.textContent = "You're Finished!";
    finalScore.textContent = "Your final score is: " + score;
}

function highscoreScreen() {

}
