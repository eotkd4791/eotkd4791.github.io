---
title: 'AOJ BOGGLE'
categories:
  - Algorithm
tags:
  - Algorithm
  - Dynamic Programming
  - Recursive
  - 종만북
---

## [AOJ] BOGGLE

[☞ [AOJ] BOGGLE](https://www.algospot.com/judge/problem/read/BOGGLE)

#### keypoint

1. 재귀 함수 호출을 이용하여 문자열의 갯수만큼 순서대로 탐색하는 것
2. 시간 초과를 방지하기 위해서 방문한 경로를 표시하고, 한번 방문한 위치는 탐색하지 않게 조건을 만들었다.

3. ch라는 매개변수를 활용하여 문자열의 몇번째 문자인가를 표시하였다.
4. 방문을 했던 좌표라도, 문자열의 몇번째 문자인가를 함께 표시하여 dp라는 3차원 배열을 만들어서 표시하였다.

#### 코드설명 및 주의사항

1. 시간 초과를 방지하기 위해서 한번 방문하고 dp[x][y][ch]에 1 표시.
2. 해당 문자열의 길이 만큼 탐색을 하지 못한다면 return된다. 2중 for문을 돌면서 다음 좌표를 탐색한다.
3. 문자열 마다 memset함수로 dp배열을 리셋했다.

#### 배운점 및 느낀점

1. 문제를 보고 접근할 때, 올바르게 접근하는 방법 연습.
2. 배운 거 어떻게 하면 효과적으로 활용할 수 있는지 고민하기.
3. 문제 항상 똑바로 읽기. (...)

#### 소스코드

```cpp
#include <iostream>
#include <cstring>
using namespace std;

int c, n;
char que[5][5];
int dx[8] = { 0,0,1,-1,1,1,-1,-1 };
int dy[8] = { 1,-1,0,0,1,-1,1,-1 };
int dp[5][5][11];
bool esc;
//esc = DFS함수로 순회하면서 문자열을 끝까지 찾으면 1, 아니면 0

void DFS(int x, int y, string *st, int idx,int ch) {//문자열, 몇번째 문자열, 몇번째 문자
 dp[x][y][ch] = 1;
 if (ch == st[idx].size()) {
  esc = 1;
  return;
 }
 for (int d = 0; d < 8; d++) {
  int nx = x + dx[d];
  int ny = y + dy[d];
  if (0 <= nx && nx < 5 && 5 > ny && ny >= 0 ) {
   if (que[nx][ny] == st[idx][ch] && dp[nx][ny][ch+1] == 0) {
    DFS(nx, ny, st, idx, ch + 1);
   }
  }
 }
}

int main() {
 ios::sync_with_stdio(0);
 cin.tie(0);
 cout.tie(0);

 cin >> c;
 for (int cc = 1; cc <= c; cc++) {
  for (int i = 0; i < 5; i++) {
   for (int j = 0; j < 5; j++) {
    cin >> que[i][j];
   }
  }

  cin >> n;
  string st[10];
  for (int i = 0; i < n; i++)
   cin >> st[i];

  for (int i = 0; i < n; i++) {
   memset(dp, 0, sizeof(dp));
   for (int a = 0; a < 5; a++) {
    for (int b = 0; b < 5; b++) {
     if (st[i][0] == que[a][b]) {
      DFS(a, b, st, i, 1);
      if (esc) break;
     }
    }
    if (esc) break;
   }
   if (esc) {
    esc = 0;
    cout << st[i] << ' ' << "YES" << '\n';
   }
   else {
    cout << st[i] << ' ' << "NO" << '\n';
   }
  }
 }
 return 0;
}
```
