---
title: "AOJ PICNIC"
categories:
  - Algorithm
tags:
  - Algorithm
  - Combination
  - Recursive
  - 종만북
---

## [AOJ] PICNIC
 [☞ [AOJ] PICNIC](https://www.algospot.com/judge/problem/read/PICNIC)

#### keypoint
재귀함수를 수행하면서 중복되지 않고, 친구 관계를 나타내는 순서쌍이 arr배열에 존재할 때, 그룹 수를 나타내는 gnum을 증가시키고 gnum의 갯수가 n/2가 되면 cnt를 올려주는 방식으로 진행하였다.

#### 코드설명 및 주의사항
1. pair자료형의 배열을 선언하여 친구 관계를 나타내는 순서쌍을 저장하였다.
2. 재귀를 돌면서 중복을 피하기 위해서 check배열을 이용하였고, 순서쌍을 저장해놓은 배열 arr에 해당 조합이 있는지 확인하고, 있으면 다음 재귀를 들어가고 아니면 for문에서 다음 학생을 보는 방식으로 구현하였다.

#### 배운점 및 느낀점
재귀를 돌면서 중복을 제거하기 위해서, 재귀함수의 인자를 하나 추가하여 그 인자값으로 for문의 시작점을 주고 받는 식으로 구현해야했다. 이 부분을 구현하지 않아서 한동안 헤멨다.

#### 소스코드
```cpp
#include <iostream>
#include <utility>
using namespace std;

int C, n, m;
int cnt;
pair<int, int> arr[45];
bool check[11];

void recur(int idx, int gnum) {
	if (m == 0) return;
	if (gnum == n / 2) {
		cnt++;
		return;
	}

	for (int i = idx; i < n; i++) {
		if (check[i]) continue;
		check[i] = 1;
		for (int j = i; j < m; j++) {
			if (i == arr[j].first && !check[arr[j].second]) {
				check[arr[j].second] = 1;
				recur(i + 1, gnum + 1);
				check[arr[j].second] = 0;
			}
		}
		check[i] = 0;
	}
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);
	cout.tie(0);

	cin >> C;
	for (int c = 1; c <= C; c++) {
		cin >> n >> m;
		for (int i = 0; i < m; i++)
			cin >> arr[i].first >> arr[i].second;
		recur(0, 0);
		cout << cnt << '\n';
		cnt = 0;
	}
	return 0;
}
```


