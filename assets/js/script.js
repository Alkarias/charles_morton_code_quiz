var containerEl = document.querySelector('#container'); //grabs the section element
var h1El = document.getElementById('header'); //grabs the h1 element
var description = document.getElementById('description'); //grabs the p element
var btnStart = document.getElementById('startBtn'); //grabs the starting button element

//this is the setup for the questions screen
var ansForm = document.createElement("form");
ansForm.setAttribute('id', 'answers');  
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");

var listClone = questionList.questions;
console.log(listClone);

//when the start button is pressed, change the display to show
//the multiple choice questions
btnStart.addEventListener('click', function() {
    description.setAttribute('style', 'display:none');
    btnStart.setAttribute('style', 'display:none');
    nextQuestion();
    containerEl.appendChild(ansForm);
    ansForm.appendChild(btn1);
    ansForm.appendChild(btn2);
    ansForm.appendChild(btn3);
    ansForm.appendChild(btn4);
});

// btn1.addEventListener('click', nextQuestion());
// btn2.addEventListener('click', nextQuestion());
// btn3.addEventListener('click', nextQuestion());
// btn4.addEventListener('click', nextQuestion());

function nextQuestion() {
    // var questionIndex = Math.floor(Math.random() * listClone.length);
    var questionIndex = 0;
    var questionNum = listClone.splice(questionIndex,1);
    
    h1El.textContent = questionNum[0].question;
    btn1.textContent = "answer";
    btn2.textContent = "answer";
    btn3.textContent = "answer";
    btn4.textContent = "answer";
    
    console.log(questionNum);
}

