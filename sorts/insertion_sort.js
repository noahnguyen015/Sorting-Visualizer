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