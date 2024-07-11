import {BubbleSort,InsertionSort} from "./sorting.js"

let arr = [];
const n = 30;

const chart = document.getElementById("chart");

const changeButton = document.getElementById("changeButton");
const sortButton = document.getElementById("sortButton");

changeButton.addEventListener("click", changeArr);
sortButton.addEventListener("click", sortArr);


function changeArr(){

    for(let i = 0; i < n; i++){
        arr[i] = Math.floor(Math.random()*(100-5+1)+5);
    }
    showArr();
}

function showArr(move){

    chart.innerHTML = "";

    for(let i = 0; i < arr.length; i++){

        const bar = document.createElement("div");
        bar.style.height = arr[i] + "%";
        bar.classList.add("bar");
        chart.appendChild(bar);

        if(move && move.indices.includes(i))
        {
            const color = "rgb(81, 194, 81)";
            bar.style.backgroundColor = color;
        }
    }
}

function sortArr(){

    const copy = [...arr];
    const copy2 = [...arr];
    //const movelist = BubbleSort(copy);
    const movelist = InsertionSort(copy);
    animateArr(movelist);

}

function animateArr(movelist){
    if(movelist.length == 0)
        return showArr();

    let move = {};
    
    move = movelist.shift();

    let i;
    let j;

    [i,j] = move.indices;
    
    if(move.type == "swap"){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    playSound(100+(arr[i]/100)*330);
    playSound(100+(arr[j]/100)*300);
    showArr(move);

    setTimeout(() => animateArr(movelist), 50);
}

let audiocontext = null;

function playSound(freq){
    if(audiocontext == null)
        audiocontext = new AudioContext();

    const duration = 0.1;

    const osc = audiocontext.createOscillator();

    osc.frequency.value = freq;

    osc.start();
    osc.stop(audiocontext.currentTime+duration);

    const node = audiocontext.createGain();

    node.gain.value = 0.1;

    node.gain.linearRampToValueAtTime(0,audiocontext.currentTime+duration);

    osc.connect(node);
    node.connect(audiocontext.destination);   
}

changeArr();
showArr();





