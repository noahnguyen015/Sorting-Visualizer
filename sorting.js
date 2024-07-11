
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

//Insertion Sort's goal is to created a pre-sorted array on the left
//Then to use the presorted array and place the next element on right in the proper place

export function InsertionSort(arr){

    //store each move for animation
    let movelist = [];

    for(let i = 0; i < arr.length; i++){
        //goes form left to right
        for(let j = i-1; j >= 0; j--){
            
            //look at the element before the ith index and what is in front of it
            movelist.push({indices: [j, j+1], type: "compare"});

            if(arr[j] > arr[j+1]){
                //if the one before is bigger, shift it to the right
                //meaning j --> to j+1
                //and j+1 value --> j
                movelist.push({indices: [j, j+1], type: "swap"});
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }else{
                //if the value before (j) is not bigger than j+1
                // it is in the correct spot (j+1)
                break;
            }
        }
    }

    return movelist;
}

