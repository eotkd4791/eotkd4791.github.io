---
title: "AOJ BOARDCOVER"
categories:
  - Algorithm
tags:
  - Algorithm
  - Search
  - DFS
  - 종만북
---

## [AOJ] BOARDCOVER
 [☞ [AOJ] BOARDCOVER](https://www.algospot.com/judge/problem/read/BOARDCOVER)

#### keypoint
1. 한 좌표에서의 경우의 수가 12개가 아니라 4개로 생각한다. 
   (ㄱ, ㄴ , ┌, ┘) - 이외의 다른 모양은 위에서부터 이미 탐색을 했다고 생각하고 구현해야 시간초과를 면할 수 있다.
2. 방향을 구현한 dir배열 구현.
3. field에서 '.'이고 check가 0으로 저장되어 있는 좌표에서 탐색을 시작한다.

---

#### 코드설명 및 주의사항
1. pos라는 함수를 만들어서 범위, field배열의 해당 좌표값이 '.'인지, check의 해당 좌표값이 0인지 확인하고 맞으면 true, 아니면 false를 반환한다.
2. 빈 칸이 없을 때까지 채워야 하므로 2중 for문에서 field값이 '.'이고 check값이 0인 부분을 찾아서 pos함수로 확인하고 dfs함수를 재귀호출한다.
3. 다시 호출된 dfs함수에서 2중 for문을 돌면서 모든 빈칸이 체크되면 1을 반환하여 ret에 누적하여 값을 출력한다.
   
---

#### 배운점 및 느낀점
1. 문제 자체는 익숙했는데 구현할 때에 틀에 박힌 생각만을 했던 것 같다.
2. 문자열로 입력을 받을 때에는 반드시 널문자가 저장되는 부분까지 고려하기.
3. 구현에 자신감 생길 때까지 연습하기.

---

#### 소스코드
```cpp
#include <iostream>
#include <utility>
using namespace std;

int H, W;
int b, ans, ret;
char field[22][22];
bool check[22][22];
pair<int, int> dir[4][3] = 
    {   
        { {0,0},{1,0},{0,1} },
        { {0,0},{1,1},{0,1} },
        { {0,0},{1,0},{1,1} },
        { {0,0},{1,0},{1,-1} } 
    };

bool pos(int nn, int xx, int yy) {
	for (int k = 0; k < 3; k++) {
		int nx = xx + dir[nn][k].first;
		int ny = yy + dir[nn][k].second;
		if (1 > nx || nx > H || 1 > ny || ny > W || check[nx][ny] || field[nx][ny] != '.')
			return false;
	}
	return true;
}

int dfs() {
	int stx = -1, sty = -1;
	for (int i = 1; i <= H; i++) {
		for (int j = 1; j <= W; j++) {
			if (field[i][j] == '.' && !check[i][j]) {
				stx = i; sty = j;
				break;
			}
		}
		if (stx != -1 || sty != -1) break;
	}
	if (stx == -1 && sty == -1) return 1;

	int ret = 0;
	for (int n = 0; n < 4; n++) {
		if (pos(n, stx, sty)) {
			for (int k = 0; k < 3; k++) {
				int nx = stx + dir[n][k].first;
				int ny = sty + dir[n][k].second;
				check[nx][ny] = 1;
			}
			ret += dfs();
			for (int k = 0; k < 3; k++) {
				int nx = stx + dir[n][k].first;
				int ny = sty + dir[n][k].second;
				check[nx][ny] = 0;
			}
		}
	}
	return ret;
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);

	int C;
	cin >> C;
	while (C--) {
		cin >> H >> W;
		for (int i = 1; i <= H; i++) {
			for (int j = 1; j <= W; j++) {
				cin >> field[i][j];
			}
		}
		int ans = dfs();
		cout << ans << '\n';
	}
	return 0;
}
```


