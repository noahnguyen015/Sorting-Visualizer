export function QuickSort(arr, first, last, quicklist){

    if(first >= last)
        return

    const pivotIdx = Partition(arr, first, last, quicklist);

    QuickSort(arr,first, pivotIdx-1, quicklist);
    QuickSort(arr, pivotIdx+1, last, quicklist);
    
}

function Partition(arr, first, last, quicklist){

    let pivotIdx = last;

    let pivot = arr[pivotIdx];

    let l = first;
    let r = last-1;

    while(l < r){

        while(arr[l] <= pivot && l < last){
        //    quicklist.push({indices: [l,r], type: "compare", pivot: pivotIdx});
            l++;
        }

        while(arr[r] >= pivot && r > first){
        //    quicklist.push({indices: [l,r], type: "compare", pivot: pivotIdx});
            r--;
        }

        if(l < r){
            quicklist.push({indices: [l,r], type: "swap", pivot: pivotIdx});
            [arr[l], arr[r]] = [arr[r], arr[l]];
        }
    }

    if(arr[l] > pivot){
        quicklist.push({indices: [l,pivotIdx], type: "swap", pivot: pivotIdx});
        [arr[pivotIdx], arr[l]] = [arr[l], arr[pivotIdx]];
    }

    pivotIdx = l;

    return pivotIdx;
}