import {BubbleSort,InsertionSort} from "./sorting.js"
import {MergeSort} from "./merge_sort.js"
import {QuickSort} from "./quick_sort.js"
import {startTimer, stopTimer, resetTimer} from "./timer.js"

let arr = [];
const n = 25;
//arr2 & arr3 used in merge sort
let arr2 = [];
let arr3 = [];
let org = [];

let isPlaying = false;
let isSetting = true;

const chart = document.getElementById("chart");

const changeButton = document.getElementById("changeButton");
const resetButton = document.getElementById("resetButton");

const bubbleSort = document.getElementById("bubbleSort");
const insertionSort = document.getElementById("insertionSort");
const mergeSort = document.getElementById("mergeSort");
const quickSort = document.getElementById("quickSort");

changeButton.addEventListener("click", changeArr);
resetButton.addEventListener("click", resetArr);

//based on button pressed, used specified sorting method
bubbleSort.addEventListener("click", ()=> sortArr("bubble"));
insertionSort.addEventListener("click", () => sortArr("insertion"));
mergeSort.addEventListener("click", () => sortArr("merge"));
quickSort.addEventListener("click", () => sortArr("quick"));

//change the numbers of the array
function changeArr(){

    //can't change while sorting
    if(!isPlaying || isSetting){
        for(let i = 0; i < n; i++){
            //equation returns number from 5-100
            arr[i] = Math.floor(Math.random()*(100-1+1)+1);
        }

        org = [...arr];
        arr2 = [...arr];
        arr3 = [...arr];
        showArr();
        //make sure you can choose sorting again
        isPlaying = false;
        //set timer back to 0 when changing
        resetTimer();
    }
}

function resetArr(){
    //can't reset while sorting
    if(!isPlaying || isSetting){
        //resets to pre-sorted array version of current array
        for(let i = 0; i < n; i++){
            arr[i] = org[i];
        }

        showArr();
        isPlaying = false;
        resetTimer();
    }
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
        //only on the positions currently being looked at
        if(move && move.indices.includes(i)){
            //const color = "rgb(81, 194, 81)";
            //const color = "rgb(105, 69, 105)";
            const color = "rgb(165, 89, 165)";
            bar.style.backgroundColor = color;
        }
    }
}

function sortArr(type){

    //use a copy of the array
    let copy = [...arr];
    let copy2 = [...arr];
    let movelist = [];

    if(type && type == "bubble"){
        //isPlaying variable will be true when pressed, set to false till sorting is finished
        if(!isPlaying){
            movelist = BubbleSort(copy);
            //booleans use to not allow pressing other buttons till sorting is done
            isPlaying = true;
            isSetting = false;
            startTimer();
            animateArr(movelist);
        }
    }
    else if(type && type == "insertion"){
        if(!isPlaying){
            movelist = InsertionSort(copy);
            isPlaying = true;
            isSetting = false;
            startTimer();
            animateArr(movelist);
        }
    }
    else if(type && type == "merge"){

        if(!isPlaying){
            let mergelist = [];
            //need to pass mergelist as well
            MergeSort(0,arr.length-1,copy,copy2,0,mergelist);
            //console.log(mergelist);
            isPlaying = true;
            isSetting = false;
            startTimer();
            animateMerge(mergelist);
        }
    }
    else if(type && type == "quick"){
        if(!isPlaying){
            let quicklist = [];
            QuickSort(copy,0,arr.length-1,quicklist);
            startTimer();
            isPlaying = true;
            isSetting = false;
            animateQuick(quicklist);
        }
    }
}

function animateArr(movelist){
    //animates the sorting of the array
    //if length is 0 show the final sorted array
    if(movelist.length == 0){
        //when finished, stop timer, and allow use of Reset & Change again
        stopTimer();
        isSetting = true;
        return showArr();
    }

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



//we need a way to show the changes of the array from merge sort
//we use a 3rd array (arr) to hold every change made
//this way we can record animations without affecting values of merging between 2 arrays
function showMerge(move, idx1,arrC){

    //clear previous chart
    chart.innerHTML = "";

    for(let i = 0; i < arr.length; i++){
        
        //if it is the index that has changed, change it
        //change from respective array arr3(arr) or arr2(copy)
        if(i == idx1){
            const bar = document.createElement("div");
            bar.style.height = arrC[i] + "%";
            bar.classList.add("bar");
            chart.appendChild(bar);
        //make sure to save the swapped value to the total array
        //it is to preserve it's spot in the animation
            arr[i] = arrC[i];
        
        //color the change to the element that is changing
        if(move && move.indices.includes(idx1)){
            const color = "rgb(165, 89, 165)";
            bar.style.backgroundColor = color;
        }
        }else{
        //don't change any other value than the one at idx1
        //make sure the rest of array stays the same throughout
            const bar = document.createElement("div");
            bar.style.height = arr[i] + "%";
            bar.classList.add("bar");
            chart.appendChild(bar);
        }
    }
}

function animateMerge(mergelist){
    
    //reset the original arrays so reset button works
    if(mergelist.length == 0){
        arr2 = [...org];
        arr3 = [...org];
        isSetting = true;
        stopTimer();
        return showMerge();
    }

    //grab the latest move
    const move = mergelist.shift();

    let i;
    let j;

    //grab indices for changing
    [i,j] = move.indices;

    if(move.type == "arr"){
    //if change to "arr" meaning array that holds the final values (arr3)
        arr3[i] = arr2[j];
        playSound(200+(arr[j]/100)*330);
        showMerge(move,i,arr3);
    }else{
    //other one is changes to "copy", array that holds the other changes and setup (arr2)
        arr2[i] = arr3[j];
        playSound(100+(arr[j]/100)*330);
        showMerge(move,i,arr2);
    }

    setTimeout(()=> animateMerge(mergelist), 50);
}

//identical to the showArr function
function showQuick(move){

    chart.innerHTML = "";

    for(let i = 0; i < arr.length; i++){
        const bar = document.createElement("div");
        bar.style.height = arr[i] + "%";
        bar.classList.add("bar");
        chart.appendChild(bar);

        //only changei is in the || inclusion
        //if it is the pivot included, then we color it red, otherwise it is a swap/compare
        if(move && move.indices.includes(i) || move.pivot == i){
            if(move.pivot == i){
                const color = "red";
                bar.style.backgroundColor = color;

            }else{
                const color = "rgb(165, 89, 165)";
                bar.style.backgroundColor = color;
            }
        }
    }
}


//identical to the animateArr function, but need to pass pivotIdx
function animateQuick(quicklist){
    if(quicklist.length == 0){
        stopTimer();
        isSetting = true;
        return showArr();
    }

    let move = {};
    
    move = quicklist.shift();

    let i;
    let j;

    [i,j] = move.indices;
    
    if(move.type == "swap"){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    playSound(100+(arr[i]/100)*330);
    playSound(100+(arr[j]/100)*330);
    showQuick(move);

    setTimeout(() => animateQuick(quicklist), 50);
}

//call to show an initial array when loaded in
changeArr();
showArr();


