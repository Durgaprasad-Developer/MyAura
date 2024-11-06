let timmer = document.getElementById('timmerInit');
let start = document.querySelector('.start');
let pause = document.querySelector('.pause');
let restart = document.querySelector('.restart');

let timerInterval;
let timerValue = 0;
let isTimerRunning = false;

function startTimer(){
    if(!isTimerRunning){
        timerInterval = (setInterval(()=>{
            timerValue++;
            timmer.innerText = timerValue;
        },1000));
        isTimerRunning = true;
    }
}
function pauseTimer(){
    clearInterval(timerInterval);
    isTimerRunning = false;
}
function stopTimer(){
    clearInterval(timerInterval);
    timerValue = 0;
    timmer.innerText = timerValue;
    isTimerRunning = false;
    // startTimer();
}

restart.addEventListener('click',stopTimer)
pause.addEventListener('click',pauseTimer);
start.addEventListener('click',startTimer);

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.maxAlternatives = 1;
recognition.continuous = true;

recognition.onstart = () => {
    console.log("Voice recognition started. Listening for commands...");
};

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log(command);

    if(command.includes('start')){
        startTimer();
    }else if(command.includes('pause')){
        pauseTimer();
    }else if(command.includes('stop')){
        stopTimer();
    }
    console.log(command);
}

recognition.start();

function speakfeedback(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}



