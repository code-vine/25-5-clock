const breakDec = document.getElementById("break-decrement");
const breakInc = document.getElementById("break-increment");
const breakLength = document.getElementById("break-length");

const sessionDec = document.getElementById("session-decrement");
const sessionInc = document.getElementById("session-increment");
const sessionLength = document.getElementById("session-length");

let alarm = document.getElementById("beep");

let timerLabel = document.getElementById("timer-label");
let timeLeft = document.getElementById("time-left");

const startStop = document.getElementById("start_stop");
const reset = document.getElementById("reset");

let timerOn = false;
let sessionTime = 25 * 60;
let breakTime = 5 * 60;

breakDec.addEventListener("click", (e)=>{
    if(timerOn)return;
    if(breakLength.innerText-1 > 0){
        breakLength.innerText--;
        breakTime = breakLength.innerText * 60;
    }
});

breakInc.addEventListener("click", (e)=>{
    if(timerOn)return;
    let count = parseInt(breakLength.innerText);
    if(count+1 <= 60 ){
        count++;
        breakLength.innerText=count;
        breakTime = count * 60;
    }
})

sessionDec.addEventListener("click", (e)=>{
    if(timerOn)return;
    if(sessionLength.innerText-1 > 0){
        sessionLength.innerText--;
        sessionTime = sessionLength.innerText * 60;
        timeLeft.innerText = formatTimer(sessionTime);
    }
});

sessionInc.addEventListener("click", (e)=>{
    if(timerOn)return;
    let count = parseInt(sessionLength.innerText);
    if(count+1 <= 60 ){
        count++;
        sessionLength.innerText =count;
        sessionTime = count * 60;
        timeLeft.innerText = formatTimer(sessionTime);
    }
})

startStop.addEventListener("click", (e)=>{
    timerOn = !timerOn;
    if(timerOn){
        startStop.className = "bi bi-pause-fill";
    }
    else{
        startStop.className = "bi bi-play-fill";
    }
})


reset.addEventListener("click", (e)=>{
    alarm.pause();
    timerLabel.innerText = "Session";
    sessionTime = 25 * 60;
    breakTime = 5*60;
    sessionLength.innerText = 25;
    breakLength.innerText = 5;
    timerOn = false;
    timeLeft.style.color = "white";
    timeLeft.innerText = formatTimer(sessionTime);
    alarm.currentTime = 0;
    startStop.className = "bi bi-play-fill";
})

function handleTimer(){
    if(!timerOn)return;
    if(sessionTime > -1){
        timerLabel.innerText = "Session";
        sessionTime--;
        timeLeft.innerText = formatTimer(sessionTime);
        if(sessionTime < 1000){
            timeLeft.style.color = "red";
        }
        if(sessionTime < 0){
            timerLabel.innerText = "Break";
            timeLeft.style.color = "white";
            
            breakTime = breakLength.innerText * 60;
            timeLeft.innerText = formatTimer(breakTime);
        }
    }
    else if(breakTime > -1){
        breakTime--;
        timeLeft.innerText = formatTimer(breakTime);
        if(breakTime < 1000){
            timeLeft.style.color = "red";
        }
        if(breakTime < 0){
            timerLabel.innerText = "Session";
            timeLeft.style.color = "white";
            alarm.play();
            sessionTime = sessionLength.innerText * 60;
            timeLeft.innerText = formatTimer(sessionTime);
        }
    }

    if(timeLeft.innerText === "00:00")
    {
        alarm.play();  
    }
    
}

function formatTimer(time){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60 ;
    let minutesLeft = minutes > 9 ? minutes : `0${minutes}`;
    let secondsLeft = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutesLeft}:${secondsLeft}`;
}

setInterval(handleTimer, 1000);