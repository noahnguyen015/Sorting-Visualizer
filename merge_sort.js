export let mergelist = [];

/*
export function MergeSort(arr){
    
    if(arr.length <= 1)
        return;

    const mid = Math.floor(arr.length/2);

    let leftArr = [];
    leftArr.length = mid;

    let rightArr = [];
    rightArr.length = arr.length - mid; 

    let i = 0;
    let j = 0;
    let idx = 0;
    let movelist1 = [];
    let movelist2 = []

    while(idx < arr.length){
        if(i < leftArr.length){
            leftArr[i] = arr[idx]; 
            movelist1.push(idx);
            i++;
            idx++;
        }else{
            rightArr[j] = arr[idx];
            movelist2.push(idx);
            j++;
            idx++;
        }
    }

    MergeSort(leftArr);
    MergeSort(rightArr);

    console.log(movelist1);
    console.log(movelist2);

    merge(leftArr, rightArr, arr, movelist1, movelist2);
}

function merge(leftArr, rightArr, arr, movelist1, movelist2){

    let i = 0;
    let j = 0;
    let idx = 0;

    while(i < leftArr.length && j < rightArr.length){
        if(leftArr[i] < rightArr[j]){
          //  mergelist.push({indices: [idx, movelist1[i]], type: "swap"});
            arr[idx] = leftArr[i];
            idx++;
            i++;
        }else{
        //    mergelist.push({indices: [idx, movelist2[j]], type: "swap"});
            arr[idx] = rightArr[j];
            idx++;
            j++;
        }
    }

    while(i < leftArr.length){
    //    mergelist.push({indices: [idx, movelist1[i]], type: "swap"});
        arr[idx] = leftArr[i];
        idx++;
        i++;
    }

    while(j < rightArr.length){
    //    mergelist.push({indices: [idx, movelist2[j]], type: "swap"});
        arr[idx] = rightArr[j];
        idx++;
        j++;
    }

    console.log(arr);
}

*/

export function MergeSort(first,last,arr,copy,num,mergelist){

    //if it is just one element, just return it as it is 
    if(first == last)
        return

    //grabs the middle index for partitioning the arrays
    const mid = Math.floor((first + last)/2);
    
    //call left side first, then right side
    //start/finish the sorting/merging on the left side, start/finish on right side
    //merge/sort them together after both sides are sorted

    /*
    1. switch back and forth between copy and arr
    2. changes done in original array
    3. then once 1 half is finished, sort it all in copy array 
    4. done so the final sort with two sorted halves is done in the actual array
    5. left hand side: 0-middle:
       right hand side: middle+1, end
    */

//    console.log(num);
    num++;

    MergeSort(first, mid, copy, arr,num,mergelist);
    MergeSort(mid+1, last, copy, arr,num,mergelist);
    merge(first, mid, last, arr, copy,num);

  //  console.log(mergelist);
    console.log(copy);
    console.log(arr);
}

function merge(first, mid, last, arr, copy,num){

// let moves = [];

//    console.log(num);

    let idx = first;
    let i = first;
    let j = mid+1;

    //use values of left indexes if value is smaller, else use values the right indexes

    while(i <= mid && j <= last){

        if(copy[i] < copy[j]){
            console.log(`${arr[idx]}(${idx}) ==> ${copy[i]}(${i})`);
            if(num%2 === 0)
                mergelist.push({indices: [idx, i], type: "copy"});
            else
                mergelist.push({indices: [idx, i], type: "arr"});

            arr[idx] = copy[i];
            idx++;
            i++;
        }else{
            console.log(`${arr[idx]}(${idx}) ==> ${copy[j]}(${j})`);
            if(num%2 === 0)
                mergelist.push({indices: [idx, j], type: "copy"});
            else
                mergelist.push({indices: [idx, j], type: "arr"});

            arr[idx] = copy[j];
            idx++;
            j++;
        }
    }

    //both while loops used to finish placing last numbers that haven't been pushed
    while(i <= mid){
        console.log(`${arr[idx]}(${idx}) ==> ${copy[i]}(${i})`);
        if(num%2 === 0)
            mergelist.push({indices: [idx, i], type: "copy"});
        else
            mergelist.push({indices: [idx, i], type: "arr"});
        arr[idx] = copy[i];
        idx++;
        i++;
    }

    while(j <= last){
        console.log(`${arr[idx]}(${idx}) ==> ${copy[j]}(${j})`);
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


