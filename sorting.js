
export function BubbleSort(arr){

    let movelist = [];

    let isSwapped = false;

    for(let i = 0; i < arr.length; i++){

        isSwapped = false;

        for(let j = 1; j < arr.length-i; j++){

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

export function InsertionSort(arr){

    let movelist = [];

    for(let i = 0; i < arr.length; i++){

        for(let j = i-1; j >= 0; j--){

            movelist.push({indices: [j, j+1], type: "compare"});

            if(arr[j] > arr[j+1]){
                movelist.push({indices: [j, j+1], type: "swap"});
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }else{
                break;
            }
        }
    }

    return movelist;
}

