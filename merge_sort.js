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

    while(idx < arr.length){
        if(i < leftArr.length){
            leftArr[i] = arr[idx]; 
            i++;
            idx++;
        }else{
            rightArr[j] = arr[idx];
            j++;
            idx++;
        }
    }

    MergeSort(leftArr);
    MergeSort(rightArr);
    merge(leftArr, rightArr, arr);
}

function merge(leftArr, rightArr, arr){

    let i = 0;
    let j = 0;
    let idx = 0;

    while(i < leftArr.length && j < rightArr.length){
        if(leftArr[i] < rightArr[j]){
            arr[idx] = leftArr[i];
            idx++;
            i++; 
        }else{
            arr[idx] = rightArr[j];
            idx++;
            j++;
        }
    }

    while(i < leftArr.length){
        arr[idx] = leftArr[i];
        idx++;
        i++; 
    }

    while(j < rightArr.length){
        arr[idx] = rightArr[j];
        idx++;
        j++;
    }
}

