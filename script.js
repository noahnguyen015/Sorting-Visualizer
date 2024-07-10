let arr = [];
n = 60;

const chart = document.getElementById("chart");

changeArr();

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

changeArr();
showArr();