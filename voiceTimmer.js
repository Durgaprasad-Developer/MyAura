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
