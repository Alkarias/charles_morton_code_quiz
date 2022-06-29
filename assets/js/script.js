//clones the question list so that the original is unaltered by .splice()
var listClone = [];

//variable used to store the score from the current attempt
var score = 0;

var timerInterval; //variable that holds the timer object
var timeRemaining = 60; //variable that holds the time remaining

//when the start button is pressed, change the display to show
//the multiple choice questions
btnStart.addEventListener('click', function() {
    listClone = questionList.questions;
    containerEl.removeChild(description);
    containerEl.removeChild(btnStart);
    nextQuestion();
    renderQuizScreen(); //switches the display to show question and answers
    startTimer();  //starts the time clock
});

//event listeners for the four answer buttons
btn1.addEventListener('click', buttonClick);
btn2.addEventListener('click', buttonClick);
btn3.addEventListener('click', buttonClick);
btn4.addEventListener('click', buttonClick);

//event listener for the score submit button
iptSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    if (iptName.value === '') { // makes sure that a name has been entered, then sends the score to the scoreboard
        alert('Enter your name!');
    } else {
        containerEl.removeChild(finalScore);
        containerEl.removeChild(scoreForm);
        renderHighscoreScreen();
        setScores();
    }
});

//event listener for the clear highscore button
clearBtn.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.clear();
    containerEl.removeChild(scoreList);
});

//event listener for the View Highscores span in the top right
hsEl.addEventListener('click', function() {
    hsEl.setAttribute('style', 'display:none');
    containerEl.removeChild(description);
    containerEl.removeChild(btnStart);
    renderHighscoreScreen();
    var highscores = JSON.parse(localStorage.getItem('highscores'));
    updateScoreBoard(highscores);
});

function buttonClick(event) {
    event.preventDefault(); //stops the form from resetting
    checkCorrect(event.target); //checks if the user clicked the correct answer
    nextQuestion(); // displays the next question
}

function nextQuestion() {
    //if all of the questions have been answered, end the quiz
    if (listClone.length === 0) { 
        renderScoreScreen();
        return;
    }
    //chooses a random question from the cloned question list
    var questionIndex = Math.floor(Math.random() * listClone.length);
    // var questionIndex = 0;
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

    // code used for troubleshooting and ensuring the matching of the correct answer and data-bool attribute
    // as well as enabling the quick clicking through the quiz to test functionality
    // btn1.setAttribute('style', 'background-color:#764faf');
    // btn2.setAttribute('style', 'background-color:#764faf');
    // btn3.setAttribute('style', 'background-color:#764faf');
    // btn4.setAttribute('style', 'background-color:#764faf');
    // window["btn" + (index+1)].setAttribute('style', 'background-color:green');
}

function checkCorrect(target) {
    // if the user clicks the correct answer, they get score added
    // if they click the wrong button, they lose time.
    if (target.getAttribute('data-bool') == 'true') {
        score++;
    } else {
        timeRemaining -= 5;
        timeEl.textContent = "Time Remaining: " + timeRemaining;
    }
    // console.log(score);
}

function startTimer() {
    timeEl.textContent = "Time Remaining: " + timeRemaining;

    timerInterval = setInterval(function() { //starts a loops that iterates every 1000ms
        timeRemaining--;//decrements the time variable
        timeEl.textContent = "Time Remaining: " + timeRemaining;//updates the time display
         
        if (timeRemaining <= 0) {
            clearInterval(timerInterval); //stop the loop
            timeRemaining = 60; // resets the clock
            timeEl.textContent = ""; //hides the time display

            //displays the score recording screen and handles
            // ending the timer
            renderScoreScreen(); 
        }
    }, 1000);


}

function renderQuizScreen() {
    hsEl.setAttribute('style', 'display:none');
    containerEl.appendChild(ansForm);
    ansForm.appendChild(btn1);
    ansForm.appendChild(btn2);
    ansForm.appendChild(btn3);
    ansForm.appendChild(btn4);
}

function renderScoreScreen() {
    clearInterval(timerInterval); // stops the timer
    timeRemaining = 60; // resets the clock
    timeEl.textContent = ""; //hides the time display
    //remove and append elements to show the new screen
    containerEl.removeChild(ansForm);
    containerEl.appendChild(finalScore);
    containerEl.appendChild(scoreForm);
    scoreForm.appendChild(lblEl);
    scoreForm.appendChild(iptName);
    scoreForm.appendChild(iptSubmit);
    h1El.textContent = "You're Finished!";
    //display the player's score
    finalScore.textContent = "Your final score is: " + score + "/25";
}

function renderHighscoreScreen() {
    h1El.textContent = "Highscores";
    containerEl.appendChild(scoreList);
    containerEl.appendChild(highscoreForm);
    highscoreForm.appendChild(backBtn);
    highscoreForm.appendChild(clearBtn);
}

function setScores() {
    //grabs the list of saved highscores
    var highscores = JSON.parse(localStorage.getItem('highscores'));
    //makes an object that contains the current attempt
    var attempt = {
        player:iptName.value,
        score:score
    }
    //if the local storage is empty, populate it
    //otherwise, add the new score to the end of the array
    if (highscores === null) {
        highscores = [attempt];
    } else {
        highscores.push(attempt);
    }
    //sort the array in order of score from largest to smallest
    highscores.sort(compare);
    // if the highscore is too long, remove excess
    if (highscores.length > 10) highscores.pop();  
    //function that loads the list of scoreboard elements
    updateScoreBoard(highscores);
    //stores the list of highscores for later use
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

function updateScoreBoard(highscores) {
    //adds each index of the highscore array and assigns it to a list item, which it appends to the scoreboard
    for (var i = 0; i < highscores.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = highscores[i].player + " : " + highscores[i].score;
        liEl.setAttribute('class', 'center');
        scoreList.appendChild(liEl);
    }
}

function compare(a, b) {
    //simple logic to sort the values in the highscores array by their score
    const scoreA = a.score;
    const scoreB = b.score;
    
    var comparison = 0;
    if (scoreA < scoreB) {
        comparison = 1;
    } else if (scoreA > scoreB) {
        comparison = -1
    }
    return comparison;
}

