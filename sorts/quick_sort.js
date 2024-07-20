export function QuickSort(arr, first, last, quicklist){

    //means that the indexes only include 1 element
    if(first >= last)
        return

    //position in pivot already chosen, so we need it to create a split between left and right
    const pivotIdx = Partition(arr, first, last, quicklist);

    //one call for leftside, one call for right side
    QuickSort(arr,first, pivotIdx-1, quicklist);
    QuickSort(arr, pivotIdx+1, last, quicklist);
    
}

function Partition(arr, first, last, quicklist){

    //our pivot in this case is the last element
    let pivotIdx = last;

    let pivot = arr[pivotIdx];

    //start at first element, and the element before pivot
    let l = first;
    let r = last-1;

    while(l < r){

        //if element is same or less, you can go forward
        while(arr[l] <= pivot && l < last){
            quicklist.push({indices: [l,r], type: "compare", pivot: pivotIdx, value: [arr[l], arr[r]], pvalue: arr[pivotIdx]});
            l++;
        }

        //if element is same or more, you can go forward
        while(arr[r] >= pivot && r > first){
            quicklist.push({indices: [l,r], type: "compare", pivot: pivotIdx, value: [arr[l], arr[r]], pvalue: arr[pivotIdx]});
            r--;
        }

        //switch should happen when # > right on left, and # < pivot on right
        if(l < r){
            quicklist.push({indices: [l,r], type: "swap", pivot: pivotIdx, value: [arr[l], arr[r]], pvalue: arr[pivotIdx]});
            [arr[l], arr[r]] = [arr[r], arr[l]];
        }
    }

    //makes sure the element being switched is larger than the pivot
    //because in 2 element array indices, it might switch when not needed
    if(arr[l] > pivot){
        quicklist.push({indices: [l,pivotIdx], type: "swap", pivot: pivotIdx, value: [arr[l], arr[r]], pvalue: arr[pivotIdx]});
        [arr[pivotIdx], arr[l]] = [arr[l], arr[pivotIdx]];
    }

    //pivot is assigned to left index and returned
    pivotIdx = l;

    return pivotIdx;
}