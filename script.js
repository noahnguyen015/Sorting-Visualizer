import {BubbleSort,InsertionSort} from "./sorting.js"
import {MergeSort,mergelist} from "./merge_sort.js"

let arr = [];
let arr2 = [];
let arr3 = [];
let org = [];
const n = 50;

const chart = document.getElementById("chart");

const changeButton = document.getElementById("changeButton");
const resetButton = document.getElementById("resetButton");

const bubbleSort = document.getElementById("bubbleSort");
const insertionSort = document.getElementById("insertionSort");
const mergeSort = document.getElementById("mergeSort");

changeButton.addEventListener("click", changeArr);
resetButton.addEventListener("click", resetArr);

//based on button pressed, used specified sorting method
bubbleSort.addEventListener("click", ()=> sortArr("bubble"));
insertionSort.addEventListener("click", () => sortArr("insertion"));
mergeSort.addEventListener("click", () => sortArr("merge"));
//change the numbers of the array
function changeArr(){

    for(let i = 0; i < n; i++){
        //equation returns number from 5-100
        arr[i] = Math.floor(Math.random()*(100-5+1)+5);
    }
    
    //arr = [100, 50, 80, 10, 30, 20];

    org = [...arr];

    arr2 = [...arr];
    arr3 = [...arr];

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
    let copy2 = [...arr];

    let movelist = [];

    if(type && type == "bubble"){
        movelist = BubbleSort(copy);
        animateArr(movelist);
    }
    else if(type && type == "insertion"){
        movelist = InsertionSort(copy);
        animateArr(movelist);
    }
    else if(type && type == "merge"){

    //    let mergelist = [];

        console.log(copy);
        MergeSort(0,arr.length-1,copy,copy2,0,mergelist);
        console.log(mergelist);

        animateMerge(mergelist);

    }
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

function showArr2(move){

    //clear element to show updated chart
    chart2.innerHTML = "";

    for(let i = 0; i < arr3.length; i++){

        //create a bar with specified height and add style
        const bar = document.createElement("div");
        bar.style.height = arr3[i] + "%";
        bar.classList.add("bar");
        chart2.appendChild(bar);

        //if a move argument is specified, change the bar to certain color
        //only on the array currently being looked at
        if(move && move.indices.includes(i))
        {
            const color = "rgb(81, 194, 81)";
            bar.style.backgroundColor = color;
        }
    }
}

function showMerge(move, idx1, idx2,arrC){

    chart2.innerHTML = "";

    for(let i = 0; i < arr3.length; i++){
        
        if(i == idx1 || i == idx2){
            const bar = document.createElement("div");
            bar.style.height = arrC[i] + "%";
            bar.classList.add("bar");
            chart2.appendChild(bar);
            arr3[i] = arrC[i];
            if(move && move.indices.includes(i)){
                const color = "rgb(81, 194, 81)";
                bar.style.backgroundColor = color;
            }
        }else{
            //create a bar with specified height and add style
            const bar = document.createElement("div");
            bar.style.height = arr3[i] + "%";
            bar.classList.add("bar");
            chart2.appendChild(bar);
        }
    }
}

function animateMerge(mergelist){
    
    if(mergelist.length == 0){
        return showArr();
    }

    const move = mergelist.shift();

    let i;
    let j;

    [i,j] = move.indices;

    if(move.type == "arr"){
        arr2[i] = arr[j];
        playSound(100+(arr[j]/100)*330);
        showArr2(move);
        showMerge(move,i,j,arr2);
    }else{
        arr[i] = arr2[j];
        playSound(100+(arr2[j]/100)*330);
        //showArr(move);
        showMerge(move,i,j,arr);
    }

    setTimeout(()=> animateMerge(mergelist), 50);
}

//call to show an inital array when loaded in
changeArr();
showArr();
showArr2();






