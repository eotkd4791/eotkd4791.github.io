---
title: 'AOJ 삼각형 위의 최대 경로'
categories:
  - Algorithm
tags:
  - Algorithm
  - BOJ
  - Dynamic Programming
  - DAG
  - 종만북
comments:
  - true
---

## [AOJ] 삼각형 위의 최대 경로 TRIANGLEPATH

☞[[AOJ] TRIANGLEPATH](https://www.algospot.com/judge/problem/read/TRIANGLEPATH)

---

#### keypoint

1. 2차원 배열로 입력을 받아서 풀었다.
2. DP로 푼 이유 -> 사이클이 없는 최장거리를 구하는 문제..(DAG->DP)
3. 트리처럼 보이지만 트리가 아니다. (부모노드가 2개인 노드가 존재하기 때문)

---

#### 코드 설명

1. 2차원 배열로 입력을 받는다.
2. (1,1)좌표로 recur함수를 호출한다.
3. 함수의 인자값 x가 N과 같아질 때까지 함수를 재귀호출한다.
4. 인자 x가 N과 같아지면 그 좌표의 arr(입력 받은 값)을 반환한다.
5. 반환 받은 값을 비교하여 큰 값으로 DP테이블을 채워나간다.
6. DP테이블이 이미 채워진 좌표를 방문할 경우, 해당 좌표에 저장되어 있는 값을 반환한다.

---

#### 고찰

1. 재귀의 진행 순서 까먹지 말기★
2. 최장 거리를 구하는 문제(Longest Path)였다. 지나온 곳을 또 지날 수 있다고 가정하면(사이클 존재) 최장 거리 문제는 원래 NP문제이다. 하지만 이 문제는 사이클이 없는 방향 그래프를 나타낸다. 알설 시간에 DAG을 의미하고 DAG은 DP로 풀 수 있다고 배웠다.
3. 나는 재귀함수의 반환값의 크기 비교를 통해서 DP테이블을 채워나가는 방식으로 구현하였다.

---

#### 소스코드

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

int C, N;
int arr[101][101];
int dp[101][101];

int recur(int x, int y) {
 if (x == N) return arr[x][y];

 int& ret = dp[x][y];
 if (ret != 0) return ret;

 ret = arr[x][y] + max(recur(x + 1, y), recur(x + 1, y + 1));
 return ret;
}

int main() {
 ios::sync_with_stdio(0);
 cin.tie(0); cout.tie(0);

 cin >> C;
 while (C--) {
  memset(dp, 0, sizeof(dp));
  cin >> N;

  for (int i = 1; i <= N; i++)
   for (int j = 1; j <= i; j++)
    cin >> arr[i][j];

  cout << recur(1, 1) << '\n';
 }
 return 0;
}
```
