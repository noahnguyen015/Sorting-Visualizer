const clock = document.getElementById("clock");

let timer = null;
let startTime = 0;
let timePassed = 0;
let running = false;

export function startTimer(){
    //grab the current time
    startTime = Date.now();
    //will call the function updateTimer every 10ms
    timer = setInterval(updateTimer,10);
}

export function updateTimer(){

    timePassed = Date.now() - startTime;

    //convert these times from milliseconds --> milli in 10s ,sec, min

    let milliseconds = Math.floor(timePassed % 1000 / 10);
    let seconds = Math.floor((timePassed/1000) % 60);
    let minutes = Math.floor(timePassed/(1000 * 60) % 60);

    //make these strings
    //padStart creates 2 0s to fill in any space that isn't double digit
    milliseconds = String(milliseconds).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    //rechange the text to new time in a string
    clock.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

export function stopTimer(){
    //remove the interval and keep the time at it's current point
    clearInterval(timer);
}

export function resetTimer(){
    //change backed to 0 in everything
    startTime = 0;
    timePassed = 0;
    clock.textContent = `00:00:00`;
}

