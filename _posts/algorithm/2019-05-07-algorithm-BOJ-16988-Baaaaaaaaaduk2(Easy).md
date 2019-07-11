---
title: "BOJ1988 Baaaaaaaaaduk2 (Easy)"
categories:
  - Algorithm
tags:
  - Algorithm
  - BOJ
  - Simulation
  - Flood fill
  - Brute Force
  - BFS
comments:
  - true
---

## [BOJ16988] Baaaaaaaaaduk2 (Easy)
 ☞[[BOJ16988] Baaaaaaaaaduk2 (Easy)](https://www.acmicpc.net/problem/16988)

#### keypoint
1. 연결되어 있는 적의 돌을 넘버링한다.
2. 각 번호별로 하나의 좌표를 대표로 g벡터에 푸쉬.
3. 빈칸의 모든 좌표를 v벡터에 넣어서 재귀를 이용하여 조합을 구현.
4. g벡터에 저장된 좌표에서 출발하여 BFS를 돌리고, 지나는 점들(field[x][y]=2)을 l벡터에 푸쉬한다.
5. 0을 만난다면, l벡터와 q를 비우고 반복문을 탈출하고, 다음번 g벡터에 저장되어 있는 좌표를 탐색한다.
6. 0을 만나지 않으면 l벡터의 size를 cnt에 누적시켜 더한다.
   (예제5번에서 반례가 발생할 수 있기 때문 : 바둑돌로 한 부분은 빈틈 없이 가뒀지만,
    다른 부분에 빈틈이 있는 경우에 빈틈없이 가둔 부분의 적 돌의 수만큼만 cnt에 포함시키기 위해서)
7. cnt가 MAX보다 크다면 갱신, 아니라면 놔두고 cnt =0으로 초기화한다.


```cpp
////////////////////////////////////////
/*
      BOJ16988 Baaaaaaaaaduk2 (Easy)
*/
///////////////////////////////////////


#include <iostream>
#include <queue>
#include <vector>
#include <utility>
#include <algorithm>
#include <cstring>
using namespace std;

int n, m;
int cnt, MAX;
int field[20][20];
bool check[20][20];
const int dx[] = { 0,0,-1,1 };
const int dy[] = { 1,-1,0,0 };
vector<pair<int, int> > v;
vector<pair<int, int> > e;
vector<pair<int, int> > l;
vector<pair<int, int> > g;

bool OOB(int x, int y) {
	if (n > x && x >= 0 && 0 <= y && y < m)
		return true;
	return false;
}
void colouringBFS(int x, int y) {
	queue<pair<int, int> > q;
	q.push({ x,y });
	while (!q.empty()) {
		int ox = q.front().first;
		int oy = q.front().second;
		q.pop();
		for (int n = 0; n < 4; n++) {
			int nx = ox + dx[n];
			int ny = oy + dy[n];
			if (OOB(nx, ny) && field[ox][oy] == field[nx][ny] && !check[nx][ny]) {
				check[nx][ny] = 1;
				q.push({ nx,ny });
			}
		}
	}
}

void badukBFS() {
	queue<pair<int, int> > q;
	for (int i = 0; i < g.size(); i++) {
		q.push({ g[i].first,g[i].second });
		l.push_back({ g[i].first,g[i].second });
		check[g[i].first][g[i].second] = 1;
		while (!q.empty()) {
			int ox = q.front().first;
			int oy = q.front().second;
			q.pop();
			for (int n = 0; n < 4; n++) {
				int nx = ox + dx[n];
				int ny = oy + dy[n];
				if (OOB(nx, ny)) {
					if (field[nx][ny] == 2 && !check[nx][ny]) {
						check[nx][ny] = 1;
						q.push({ nx,ny });
						l.push_back({ nx,ny });
					}
					if (field[nx][ny] == 0) {
						while (!q.empty()) q.pop();
						l.clear();
						break;
					}
				}
			}
		}
		int sz = l.size();
		cnt += sz;
		l.clear();
	}
	MAX = max(MAX, cnt);
	cnt = 0;
}

void badukpick(int me) {
	if (me == 2) {
		badukBFS();
		memset(check, 0, sizeof(check));
		return;
	}
	for (int i = 0; i < v.size(); i++) {
		if (field[v[i].first][v[i].second] == 0) {
			field[v[i].first][v[i].second] = 1;
			badukpick(me + 1);
			field[v[i].first][v[i].second] = 0;
		}
	}
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);
	cin >> n >> m;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			cin >> field[i][j];
			if (field[i][j] == 0) v.push_back({ i,j });
			if (field[i][j] == 2) e.push_back({ i,j });
		}
	}
	for (int i = 0; i < e.size(); i++) {
		int ex = e[i].first;
		int ey = e[i].second;
		if (field[ex][ey] == 2 && !check[ex][ey]) {
			g.push_back({ ex,ey });
			colouringBFS(ex, ey);
		}
	}
	memset(check, 0, sizeof(check));
	badukpick(0);
	cout << MAX;
	return 0;
}
```
