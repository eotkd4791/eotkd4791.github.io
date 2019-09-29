---
title: "병합 정렬 Merge Sort"
categories:
  - data structure
tags:
  - data structure
  - Merge Sort
comments:
  - true
---

## 병합 정렬 Merge Sort

#### 원리
분할정복을 이용한 정렬 방법.<br>

1. 분할
2. 정복
3. 결합

>"8개의 데이터를 동시에 정렬하는 것보다, 이를 둘로 나눠서 4개의 데이터를 정렬하는 것이 쉽고, 또 이들 각각을 다시 한번 둘로 나눠서 2개의 데이터를 정렬하는 것이 더 쉽다."

---

- 데이터가 1개만 남을 때까지 분할하고, <b>병합하면서 데이터를 정렬한다.</b>
- 분할하는 데에 걸리는 시간은 정렬하고자 하는 데이터의 수가 N이라고 했을 때, <b>log₂N</b>이다.
- 분할의 과정에서 하나씩 구분이 될 때까지 분할을 반복하는 이유는 <b>재귀적 구현</b> 때문이다.

```cpp
//병합정렬을 위한 함수.
void MergeSort(int arr[], int left, int right) {

    int mid = (left + right) / 2;

    if(left < right) {

        MergeSort(arr, left, mid);           // 중간값을 기준으로 왼쪽 영역
        MergeSort(arr, mid+1, right);        // 중간값을 기준으로 오른쪽 영역

        MergeTwoArea(arr, left, mid, right); //두 영역을 정렬하고 병합한다.
    }
}

```

---

- 재귀호출로 분할한 데이터를 정렬하면서 병합한다.



```cpp
void MergeTwo(int arr[], int left, int mid, int right){

    int fidx = left;//왼쪽 영역의 첫번째 데이터
    int ridx = mid + 1;//오른쪽 영역의 첫번째 데이터

   //병합한 결과를 담을 배열을 생성한다.
    int * sortArr = (int*) malloc(sizeof(int) *(right+1));
    int sidx = left;

    //병합할 두 영역의 데이터를 비교하여 정렬된 순서대로 sortArr에 넣는다.
    while(fidx <= mid && ridx <= right){
        
        if(arr[fidx] <= arr[ridx]) {

            if(arr[fidx] <= arr[ridx])
                sortArr[sidx] = arr[fidx++];

            else
                sortArr[sidx] = arr[ridx++];
        }

        sidx++;
    }


 
    //배열의 앞부분이 모두 sortArr에 옮겨졌다면,
    if(fidx > mid)
        //배열 뒷부분에 남은 데이터들을 sortArr에 옮긴다.
        for(int i = ridx; i<=right; i++, sidx++)
            sortArr[sidx] = arr[i];
    
    //뒷부분 데이터들이 모두 옮겨졌다면,
    else
        //앞부분에 남은 데이터들을 옮긴다.
        for(int i=fidx; i<=mid; i++, sidx++)
            sortArr[sidx] = arr[i];

    for(int i = left; i<=right; i++)
        arr[i] = sortArr[i];

    free(sortArr);
}
```

---

### 성능평가

1. n개의 데이터를 정렬할 때, 각 병합의 단계마다 최대 n번의 비교연산이 진행된다.
2. n개의 데이터를 n/2개의 데이터를 가진 두 영역으로 나누어 연산을 진행하기 때문에 분할(병합)의 횟수는 log₂n이다.
3. 따라서 n개의 데이터를 가지고 비교연산을 수행하는 데에 걸리는 시간 nlog₂n.
4. 병합정렬의 이동연산 횟수 = 비교연산 횟수의 두 배.
   - 임시 배열에 데이터를 병합하는 과정에서 한번
   - 임시 배열에 저장된 데이터를 전부 원위치로 옮기는 과정에서 한번
> => " O(nlog₂n) "
