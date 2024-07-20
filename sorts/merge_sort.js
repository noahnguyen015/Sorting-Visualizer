
//call left side first, then right side
//start/finish the sorting/merging on the left side, start/finish on right side
//compares 2 sorted subarrays to make a sorted main array
//merge/sort them together after both sides are sorted
export function MergeSort(first,last,arr,copy,num,mergelist){

    //if it is just one element, just return it as it is 
    if(first == last)
        return

    //grabs the middle index for partitioning the arrays
    const mid = Math.floor((first + last)/2);
    

    /*
    1. switch back and forth between copy and arr
    2. starts with changes in arr (original array)
    3. Then it flip flops from arr-copy changes, depending on stage of merging it is at
    4. start with sorting left then right
    5. 2 halves sorted --> compare and put into "arr" (depending on stage)
    6. 2nd last will always be the arr = copy
    7. Done so the final sort with two sorted halves is done in the actual array (arr)
    8. left hand side: 0, middle:
    9. right hand side: middle+1, end

       NOTE: Due to flip flop, we need to keep track of which array's values are being changed

       1. We need a number (num), passed as 0 initally and +1 every time we branch out into 2 subarrays
       2. MergeSort flip flops when arr = arr --> copy --> array --> copy --> ...
       3. This means all changes to arr are at even numbers
       4. Which also means all changes to copy are odd numbers
       5. So we specify if the number is even, we record it as a change in arr
       6. Also implying we record the rest as changes done in copy

    */

    //increment, merging & 2 halves will have same number
    //indicating arr = arr? or arr = copy
    
    num++;

    MergeSort(first, mid, copy, arr, num, mergelist);
    MergeSort(mid+1, last, copy, arr,num, mergelist);
    merge(first, mid, last, arr, copy, num, mergelist);

}

function merge(first, mid, last, arr, copy,num, mergelist){

// let moves = [];

//    console.log(num);

    let idx = first;
    let i = first;
    let j = mid+1;

    //use values of left indexes if value is smaller, else use values the right indexes

    while(i <= mid && j <= last){

        if(copy[i] < copy[j]){
            //used to specify odd or even (0 = even, 1 = odd)
            if(num%2 === 0)
            //records the change in value at idx to value at i in "copy"
            //"copy" depends on which stage the merge is at
                mergelist.push({indices: [idx, i], type: "copy"});
            else
                mergelist.push({indices: [idx, i], type: "arr"});

            //perform change, then increment on
            arr[idx] = copy[i];
            idx++;
            i++;
        }else{
            if(num%2 === 0)
            //same recording except done with j instead of i in "copy"
                mergelist.push({indices: [idx, j], type: "copy"});
            else
                mergelist.push({indices: [idx, j], type: "arr"});

            arr[idx] = copy[j];
            idx++;
            j++;
        }
    }

    //both while loops used to finish placing last numbers that haven't been pushed
    //don't need to worry if last #'s in order, the 2 arrays comparing should be sorted
    while(i <= mid){
        if(num%2 === 0)
            mergelist.push({indices: [idx, i], type: "copy"});
        else
            mergelist.push({indices: [idx, i], type: "arr"});
        arr[idx] = copy[i];
        idx++;
        i++;
    }

    while(j <= last){
        if(num%2 === 0)
            mergelist.push({indices: [idx, j], type: "copy"});
        else
            mergelist.push({indices: [idx, j], type: "arr"});
        arr[idx] = copy[j];
        idx++;
        j++;
    }

//    return moves;

}


