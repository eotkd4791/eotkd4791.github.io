---
title: "Divide & Conquer - Matrix Multiply"
categories:
  - Algorithm
tags:
  - Algorithm
  - Divide & Conquer
  - Recursion
  - Math
  - Strassen
  - Theory
comments:
  - true
---

## 행렬 곱셈을 위한 스트라센 알고리즘

### 행렬 곱셈
```cpp
Matrix-Multiply(A,B) {
    n=A.rows;
    for(int i=1; i<=n; i++) {
        for(int j=1; j<=n; j++) {
            C[i][j]=0;
            for(int k=1; k<=; k++) 
                C([i][j]=C[i][j]+A[i][k]*B[k][j];
        }
    }
    return C;
}
```
3중 for문은 Θ(n³)의 시간이 걸린다. 스트라센 알고리즘은 O(n^lg7)의 수행시간을 갖는다. (lg7 = 2.81) 행렬 곱셈의 하계가 Ω(n²)일 때, 스트라센 알고리즘은 하계 근접한 알고리즘이라고 할 수 있다. 8번의 곱셈을 수행해야 하는 기존의 방식에서 7번으로 곱셈 연산 횟수를 줄이고 덧셈 연산 횟수를 늘려, 수행 시간을 단축시킬 수 있다. 덧셈을 수행하는 데에 상수 시간이 걸려서 시간복잡도의 표기법에서 생략할 수 있지만, 곱셈의 경우에는 n²의 시간이 걸리기 때문이다.

---

#### 행렬 A,B를 곱하여 C를 만드는 함수 - 분할정복
```
Matrix-Multiple-Recursive(A,B) {
    n=A.rows;
    if(n==1)
       c₁₁ = a₁₁ * b₁₁
    else {
        C₁₁ = Matrix-Multiple-Recursive(A₁₁,B₁₁) +
              Matrix-Multiple-Recursive(A₁₂,B₂₁);

        C₁₂ = Matrix-Multiple-Recursive(A₁₁,B₁₂) +
              Matrix-Multiple-Recursive(A₁₂,B₂₂);

        C₂₁ = Matrix-Multiple-Recursive(A₂₁,B₁₁) +
              Matrix-Multiple-Recursive(A₂₂,B₂₁);

        C₂₂ = Matrix-Multiple-Recursive(A₂₁,B₁₂) +
              Matrix-Multiple-Recursive(A₂₂,B₂₂);
    }
    return C;
}
```

#### 점화식
n * n 크기의 행렬을 곱하는 데에 걸리는 시간 T(n),
위의 코드에서 각 재귀호출은 n/2 * n/2크기의 행렬을 담당하며, 8번 호출되므로 8T(n/2)의 시간이 걸린다. 또한 덧셈을 고려해야 하는데, n/2 * n/2크기의 행렬의 원소 갯수는 n²/4이므로 Θ(n²/4)->Θ(n²)의 시간이 걸린다.<br>
>따라서 점화식은 <br>
>    T(n) = if(n==1) Θ(1)<br>
>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = if(n>1) 8T(n/2) + Θ(n²) 

---

>참고문헌<br>
INTRODUCTION TO ALGORITHMS 3rd Edition<br>CLRS지음, 문병로,심규석,이충세 옮김
