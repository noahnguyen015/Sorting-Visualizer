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

//based on button pressed, used specified sorting method
bubbleSort.addEventListener("click", ()=> sortArr("bubble"));
insertionSort.addEventListener("click", () => sortArr("insertion"));

//change the numbers of the array
function changeArr(){

    for(let i = 0; i < n; i++){
        //equation returns number from 5-100
        arr[i] = Math.floor(Math.random()*(100-5+1)+5);
    }
    org = [...arr];
    showArr();
}

function resetArr(){
    //resets to pre-sorted array version of current array
    for(let i = 0; i < n; i++){
        arr[i] = org[i];
    }
    console.log(arr);
    showArr();
}

function showArr(move){

    //clear element to show updated chart
    chart.innerHTML = "";

    for(let i = 0; i < arr.length; i++){

        //create a bar with specified height and add style
        const bar = document.createElement("div");
        bar.style.height = arr[i] + "%";
        bar.classList.add("bar");
        chart.appendChild(bar);

        //if a move argument is specified, change the bar to certain color
        //only on the array currently being looked at
        if(move && move.indices.includes(i))
        {
            const color = "rgb(81, 194, 81)";
            bar.style.backgroundColor = color;
        }
    }
}

function sortArr(type){

    //use a copy of the array
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
    //animates the sorting of the array
    //if length is 0 show the final sorted array
    if(movelist.length == 0)
        return showArr();

    let move = {};
    
    move = movelist.shift();

    let i;
    let j;

    [i,j] = move.indices;
    
    //swap the actual array
    if(move.type == "swap"){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    //sound playing to show array bars being swapped
    //interpolation equation, in between 100-430Hz
    playSound(100+(arr[i]/100)*330);
    playSound(100+(arr[j]/100)*330);
    showArr(move);

    //call the function every 50 seconds till there are no more moves
    setTimeout(() => animateArr(movelist), 50);
}

let audiocontext = null;

function playSound(freq){
    //create audiocontext object
    if(audiocontext == null)
        audiocontext = new AudioContext();

    //how long the sound last
    const duration = 0.1;

    const osc = audiocontext.createOscillator();

    //frequency value argument based on array value/bar height
    osc.frequency.value = freq;

    osc.start();
    //stop after duration
    osc.stop(audiocontext.currentTime+duration);

    const node = audiocontext.createGain();
    
    //control volume to be about 10%
    node.gain.value = 0.1;

    //remove static in the sound
    node.gain.linearRampToValueAtTime(0,audiocontext.currentTime+duration);


    //connect  oscillator --> node --> speakers
    osc.connect(node);
    //destination is usually speakers/headphones
    node.connect(audiocontext.destination);   
}

//call to show an inital array when loaded in
changeArr();
showArr();





