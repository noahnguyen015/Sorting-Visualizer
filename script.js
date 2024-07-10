
let arr = [];
n = 20;

const chart = document.getElementById("chart");

function changeArr(){

    for(let i = 0; i < n; i++){
        arr[i] = Math.floor(Math.random()*(100-5+1)+5);
    }
    showArr();
}

console.log(arr);

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

function BubbleSort(arr){

    movelist = [];

    let isSwapped = false;

    for(let i = 0; i < arr.length; i++){

        isSwapped = false;

        for(j = 1; j < arr.length; j++){

            movelist.push({indices: [j-1, j], type: "compare"});

            if(arr[j-1] > arr[j]){
                movelist.push({indices: [j-1, j], type: "swap"});
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
                
                isSwapped = true;
            }
        }

        if(!isSwapped)
            break;
    }
    return movelist;
}

function sortArr(){

    const copy = [...arr];
    console.log(arr);
    const movelist = BubbleSort(copy);
    console.log(movelist);
    animateArr(movelist);
    console.log(copy);
}

function animateArr(movelist){
    if(movelist.length == 0)
        return showArr();

    move = {};
    
    move = movelist.shift();


    [i,j] = move.indices;
    
    if(move.type == "swap"){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    playSound(100+(arr[i]/100)*330);
    playSound(100+(arr[j]/100)*330);
    showArr(move);

    setTimeout(() => animateArr(movelist), 25);
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





