---
title: "AOJ 외발 뛰기"
categories:
  - Algorithm
tags:
  - Algorithm
  - Recursive
  - Dynamic Programming
  - 종만북

---

## [AOJ] 외발 뛰기 JUMPGAME
 [☞ [AOJ] JUMPGAME](https://www.algospot.com/judge/problem/read/JUMPGAME)



#### 코드설명 및 주의사항
재귀호출을 이용하여 field배열 각각의 좌표에 저장되어 있는 값만큼 dx,dy배열에 곱하여 이동시켰다.

---

#### 배운점 및 느낀점
- ☆부분에서 범위를 검사하는 if조건절과 dp가 1인지를 검사하는 조건절을 한 줄로 합쳐서 구현했다.
- 그런 경우에 범위에는 들어가지만 dp배열값이 1이라면 아랫쪽 else문으로 들어가게 되는데 그 else 문에서 dp배열의 값이 0으로 초기화될 수가 있다.
- 그렇기 때문에 if조건절을 나누어 구현하여야 그런 예외까지도 다 잡을 수 있다.
- 오랜만에 dp문제를 풀어보니 그 방향으로 생각이 잘 되지 않아서 애먹었다.

---

#### 소스코드
```cpp
#include <iostream>
#include <cstring>
using namespace std;

int N;
int field[101][101];
int dp[101][101];
int dx[] = { 0,1 };
int dy[] = { 1,0 };

int recur(int x, int y, int z) {
	dp[x][y] = 1;
	if (x == N - 1 && y == N - 1) 
		return 1;
	
	else {
		for (int dir = 0; dir < 2; ++dir) {
			int nx = x + dx[dir] * z;
			int ny = y + dy[dir] * z;
			if (nx < N && N > ny) {//☆
				if(dp[nx][ny] != 1)//☆
					dp[nx][ny] = recur(nx, ny, field[nx][ny]);
			}
			else {
				if (dir == 0) 
					continue;
				else 
					dp[x][y] = 0;
			}
		}
	}
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0); cout.tie(0);

	int C;
	cin >> C;
	while (C--) {
		memset(dp, -1, sizeof(dp));
		cin >> N;
		for (int i = 0; i < N; i++) 
			for (int j = 0; j < N; j++) 
				cin >> field[i][j];
			
		int ret = recur(0, 0, field[0][0]);
		if (dp[N-1][N-1] == 1)
			cout << "YES" << "\n";
		else
			cout << "NO" << "\n";
	}
	return 0;
}

```


