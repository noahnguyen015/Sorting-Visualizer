const clock = document.getElementById("clock");

let timer = null;
let startTime = 0;
let timePassed = 0;
let running = false;

export function startTimer(){

    if(!running){
        startTime = Date.now();
        timer = setInterval(updateTimer,10);
        running = true;
    }
}

export function updateTimer(){

    timePassed = Date.now() - startTime;

    //convert these times from milliseconds

    let milliseconds = Math.floor(timePassed % 1000 / 10);
    let seconds = Math.floor((timePassed/1000) % 60);
    let minutes = Math.floor(timePassed/(1000 * 60) % 60);

    milliseconds = String(milliseconds).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    clock.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

export function stopTimer(){

    if(running){
        clearInterval(timer);
        startTime = Date.now() - timePassed;
        running = false;
    }

}

export function resetTimer(){

    startTime = 0;
    timePassed = 0;
    running = false;

    clock.textContent = `00:00:00`;
}

