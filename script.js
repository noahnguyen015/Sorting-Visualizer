import {BubbleSort,InsertionSort} from "./sorting.js"

let arr = [];
let org = [];
const n = 30;

const chart = document.getElementById("chart");

const changeButton = document.getElementById("changeButton");
const resetButton = document.getElementById("resetButton");

const bubbleSort = document.getElementById("bubbleSort");
const insertionSort = document.getElementById("insertionSort");

changeButton.addEventListener("click", changeArr);
resetButton.addEventListener("click", resetArr);

bubbleSort.addEventListener("click", ()=> sortArr("bubble"));
insertionSort.addEventListener("click", () => sortArr("insertion"));


function changeArr(){

    for(let i = 0; i < n; i++){
        arr[i] = Math.floor(Math.random()*(100-5+1)+5);
    }
    org = [...arr];
    showArr();
}

function resetArr(){
    for(let i = 0; i < n; i++){
        arr[i] = org[i];
    }
    console.log(arr);
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

function sortArr(type){

    const copy = [...arr];
    let movelist = [];

    if(type && type == "bubble"){
        movelist = BubbleSort(copy);
    }
    else if(type && type == "insertion"){
        movelist = InsertionSort(copy);
    }
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
    playSound(100+(arr[j]/100)*330);
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





