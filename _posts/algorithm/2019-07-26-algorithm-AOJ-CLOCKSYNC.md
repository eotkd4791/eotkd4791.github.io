---
title: "AOJ 시계 맞추기"
categories:
  - Algorithm
tags:
  - Algorithm
  - DFS
  - Recursive
  - 종만북
---

## [AOJ] CLOCKSYNC
 [☞ [AOJ] CLOCKSYNC](https://www.algospot.com/judge/problem/read/CLOCKSYNC)

#### keypoint
1. 재귀로 조합 구현.
2. 중복을 제거해야 재귀의 깊이가 깊어지지 않고, 시간 안에 해결할 수 있다. 또한, 이미 MIN변수에 저장되어 있는 값보다 cnt가 크거나 같을 경우에는 return을 통해서 해당 경우의 수를 탐색하지 않도록 하였다.

---

#### 코드설명 및 주의사항
1. 8,12/14,15번 시계와 같이 어느 스위치에나 같이 묶여서 존재하는 경우 시계 바늘이 가리키는 방향이 다르면 몇번을 돌려도 모든 시계 바늘이 12시를 가리킬 수 없다. 때문에 -1을 출력한다.
2. 버튼을 4번 누르는 것은 한번도 안 누르는 것과 같다. 따라서 0~3번 까지의 경우의 수만 파악한다.

---

#### 배운점 및 느낀점
1. 시간 제한을 잘 확인한 후에 그 상황에 알맞는 방식으로 접근하는 것 연습하기.
2. 세 시간 동안 어떤 식으로 접근해야 하는지 떠올리지 못한 문제이다. 문제에서 제시해주는 조건을 꼼꼼하게 살피고 빠르게 코드를 구현하는 것보다 정확한 아이디어로 차근차근 구현하는 연습을 해야겠다.

---

#### 소스코드
```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <climits>
#include <cstring>
using namespace std;

vector<vector<int> > v({
	vector<int>({ 0, 1, 2 }),
	vector<int>({ 3, 7, 9, 11 }),
	vector<int>({ 4, 10, 14, 15 }),
	vector<int>({ 0, 4, 5, 6, 7 }),
	vector<int>({ 6, 7, 8, 10, 12 }),
	vector<int>({ 0, 2, 14, 15 }),
	vector<int>({ 3, 14, 15 }),
	vector<int>({ 4, 5, 7, 14, 15 }),
	vector<int>({ 1, 2, 3, 4, 5 }),
	vector<int>({ 3, 4, 5, 9, 13 })
});

int field[16];
int check[16];
int MIN = INT_MAX;

void dfs(int swit, int cnt) {
	if (MIN <= cnt) return;
	for (int i = 0; i < 16; i++) {
		if (check[i] % 4 != 0) break;
		else if (check[i] % 4 == 0 && i < 15) continue;
		else if (check[i] % 4 == 0 && i == 15) {
			MIN = min(MIN, cnt);
			return;
		}
	}
	if (swit > 9) return;
	for (int i = 0; i < 4; i++) {
		int sz = v[swit].size();

		for (int j = 0; j < sz; j++) {
			check[v[swit][j]] += i;
		}
		dfs(swit + 1, cnt + i);
		for (int j = 0; j < sz; j++) {
			check[v[swit][j]] -= i;
		}
	}
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);

	int C;
	cin >> C;
	while (C--) {
		MIN = INT_MAX;
		memset(check, 0, sizeof(check));

		for (int i = 0; i < 16; i++) {
			cin >> field[i];
			if (field[i] == 12)		check[i] = 0;
			else if (field[i] == 9) check[i] = 3;
			else if (field[i] == 6) check[i] = 2;
			else if (field[i] == 3) check[i] = 1;
		}

		if (field[8] != field[12])
			cout << "-1" << '\n';
		else if (field[14] != field[15])
			cout << "-1" << '\n';
		else {
			dfs(0, 0);
			if (MIN == INT_MAX)
				MIN = -1;
			cout << MIN << '\n';
		}
	}
	return 0;
}
```


