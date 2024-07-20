
//the goal of BubbleSort is to move the greates number to the top by "bubbling" it
//this is done by one by one comparisons till the top is reached

export function BubbleSort(arr){ 

    //move list is used to store the moves of the swapping
    let movelist = [];

    //checks if the array needs to be checking for swaps
    let isSwapped = false;

    for(let i = 0; i < arr.length; i++){

        isSwapped = false;

        for(let j = 1; j < arr.length-i; j++){
            //comparsion, to see which bars are to be compared
            movelist.push({indices: [j-1, j], type: "compare"});

            if(arr[j-1] > arr[j]){
                //previous element is greater than current? swap them
                //if there is one push to the movelist and swap them
                movelist.push({indices: [j-1, j], type: "swap"});
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
                //means there was a swap, so keep going
                isSwapped = true;
            }
        }

    
        //isSwapped = false; means all elements are sorted
        if(!isSwapped)
            break;
    }
    return movelist;
}


