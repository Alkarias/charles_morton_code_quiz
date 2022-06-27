//grabbing all of the elements of the start screen
var containerEl = document.querySelector('#container'); 
var h1El = document.getElementById('header');
var description = document.getElementById('description');
var btnStart = document.getElementById('startBtn');
var timeEl = document.getElementById('time');


//this is the setup for the questions screen
var ansForm = document.createElement("form");
ansForm.setAttribute('id', 'answers');  
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");

//this is the setup for the finished screen
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

//this is the setup for the scoreboard

