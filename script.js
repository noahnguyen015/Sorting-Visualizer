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

function showArr(){

    chart.innerHTML = "";

    for(let i = 0; i < arr.length; i++){

        const bar = document.createElement("div");
        bar.style.height = arr[i] + "%";
        bar.classList.add("bar");
        chart.appendChild(bar);
    }
}

function BubbleSort(arr){

    movelist = [];

    let isSwapped = false;

    for(let i = 0; i < arr.length; i++){

        isSwapped = false;

        for(j = 0; j < arr.length; j++){

            movelist.push({indices: [j, j+1], type: "compare"});

            if(arr[j] > arr[j+1]){
                movelist.push({indices: [j, j+1], type: "swap"});
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                
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
    animateArr(movelist);
    console.log(copy);
}

function animateArr(movelist){
    if(movelist.length == 0)
    {
        console.log("hello");
        return showArr();
    }

    move = {};
    
    move = movelist.shift();


    [i,j] = move.indices;

    
    if(move.type == "swap"){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    showArr();

    setTimeout(() => animateArr(movelist), 10);
}

changeArr();
showArr();




