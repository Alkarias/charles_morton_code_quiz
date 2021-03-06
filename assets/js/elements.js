//grabbing all of the elements of the start screen
var containerEl = document.querySelector('#container'); 
var h1El = document.getElementById('header');
var description = document.getElementById('description');
var btnStart = document.getElementById('startBtn');
var timeEl = document.getElementById('time');
var hsEl = document.getElementById('highscores');


//making the elemets for the quiz screen
var ansForm = document.createElement("form");
ansForm.setAttribute('id', 'answers');  
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");

//making the elements for the score screen
var scoreForm = document.createElement("form");
scoreForm.setAttribute('class', 'center');
var finalScore = document.createElement("p");
var lblEl = document.createElement("label");
lblEl.setAttribute('for', "userName");
lblEl.textContent = "Enter your name: "
var iptName = document.createElement("input");
iptName.setAttribute('id','userName');
var iptSubmit = document.createElement("input");
iptSubmit.setAttribute('id', 'submit');
iptSubmit.setAttribute('type', 'submit');

//making the elements for the highscore board
var scoreList = document.createElement('ol');
var highscoreForm = document.createElement('form');
highscoreForm.setAttribute('class', 'center');
var backBtn = document.createElement('button');
backBtn.textContent = "Go Back";
var clearBtn = document.createElement('button');
clearBtn.textContent = "Clear Highscores";