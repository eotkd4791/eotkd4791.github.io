---
title: "Divide & Conquer (BOJ10211)"
categories:
  - Algorithm
tags:
  - Algorithm
  - Divide & Conquer
  - Recursion
  - Theory
comments:
  - true
---

## 분할정복 Divide and Conquer


### 특성
>**" 분할->정복->결합 " 의 세 가지 단계를 거치면서 재귀적으로 문제를 푼다.**

1. 분할 : 현재의 문제와 동일한 문제를 입력의 크기가 더 작은 부분 문제로 분할.
2. 정복 : 부분 문제를 재귀적으로 풀어서 정복.
3. 결합 : 부분 문제의 해를 결합하여 원래 문제의 해가 되도록 만든다.

#### 최대 부분 배열 문제
어떤 물건을 딱 한번 사고 팔 수 있다고 가정하고 최대 이익 구하기.

1. <가설> 가장 낮은 가격에 사거나 가장 높은 가격에 팔거나, 둘 중 하나만 해도 이익을 최대화 할 수 있다.
  1일차 9원, 2일차 10원, 3일차 1원, 4일차 9원, 5일차 0원일 때.
2. 주먹구구 해(완전 탐색)
   가능한 모든 쌍을 시도= 시간 오래걸린다. O(n²)
3. 입력을 변환하기.
   일별 가격 변동을 따로 계산하여(전처리) 배열에 저장된 값을 불러오는 방식(쿼리)-> 값을 불러오는 시간은 상수 시간으로 짧지만, 따로 계산할 때(전처리) 시간이 오래 걸린다.
4. 분할정복으로 풀기
   전체 0~n-1까지의 범위를 n/2를 기준으로 반을 나눈다. 그리고 나눈 범위는 기준의 왼쪽 범위에서 구한 최대값, 오른쪽 범위에서 구한 최대값, 기준을 포함하는 범위의 최대값, 이렇게 세 가지 경우를 나누어 최대값을 출력하고 그 중에서도 가장 큰 값을 출력한다.

  > **기준의 왼쪽, 오른쪽 범위에서 구하는 값은 재귀로 풀 수 있다. 기준mid를 포함하는 범위에서의 최대값은 중간에서 왼쪽 방향으로 탐색하면서 구한 최대값 + 오른쪽 방향으로 탐색하면서 구한 최대값이다.**


### 예시 문제 소스코드
```cpp
//////////////////////////////
/*
    BOJ10211 Maximum Subarray
*/
//////////////////////////////
#include <iostream>
#include <algorithm>
using namespace std;

int n;
int x[1002];

//기준을 포함하는 범위를 탐색하는 함수.
//왼쪽, 오른쪽을 탐색하는 함수가 호출되어 수행하면서 이 함수도 계속 호출되어 연산을 수행한다.
int MaxCrossSubArr(int low, int mid, int high) { 
    //왼쪽 방향으로 탐색한다.
	int Lsum = -987654321;
	int sum = 0;
	for (int i = mid; i >= low; i--) {
		sum += x[i];
		if (sum > Lsum) 
			Lsum = sum;
	}
    //오른쪽 방향으로 탐색한다.
	int Rsum = -987654321;
	sum = 0;
	for (int j = mid + 1; j <= high; j++) {
		sum += x[j];
		if (sum > Rsum)
			Rsum = sum;
	}
	return Lsum + Rsum;
}

//기준 지나지 않고 오른쪽, 왼쪽 방향을 탐색하는 함수.
int MaxSubArr(int low, int high) {
    //Base case (기저)
	if (low == high) 
		return x[low];
	int mid = (low + high) / 2;
	int Ls = MaxSubArr(low, mid);
	int Rs = MaxSubArr(mid + 1, high);
	int Cs = MaxCrossSubArr(low, mid, high);
	return max(max(Rs, Cs), Ls);
    //세 가지 값 중, 최대값을 출력한다.
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);

	int T;
	cin >> T;
	for (int t = 1; t <= T; t++) {
		cin >> n;
		for (int i = 0; i < n; i++) 
			cin >> x[i];

		cout << MaxSubArr(0, n - 1) << '\n';
	}
	return 0;
}
```
> 예시 문제를 풀면서 Ls Rs Cs 변수를 전역으로 선언하여 계속 틀렸다. 재귀호출을 진행하면서 계산에 영향을 준 것 같다고 느끼고 지역변수로 바꿔 선언하니 AC를 받을 수 있었다.
> 
> MaxCrossSubArr함수는 한번만 도는 것이 아니라 처음에 설정된 mid값을 기준으로 왼쪽, 오른쪽을 탐색하는 함수가 재귀호출되어 MaxSubArr함수로 들어갈 때마다 수행된다.

---


>참고문헌<br>
INTRODUCTION TO ALGORITHMS 3rd Edition<br>CLRS지음, 문병로,심규석,이충세 옮김
