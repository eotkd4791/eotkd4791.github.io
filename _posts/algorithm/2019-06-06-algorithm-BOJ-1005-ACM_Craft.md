---
title: "BOJ1005 ACM Craft"
categories:
  - Algorithm
tags:
  - Algorithm
  - BOJ
  - Graph
  - Topological Ordering(Sorting)
  - BFS
  - DFS
  
comments:
  - true
---

## [BOJ1005] ACM Craft
 [☞ [BOJ1005] ACM Craft](https://www.acmicpc.net/problem/1005)

#### keypoint
> * DFS/BFS로 위상 정렬를 구현한다.
> * 위상 정렬된 순서대로 각각의 vertex를 탐색하며 해당 vertex의 indegree가 어느 vertex에서 오는지 저장한다.
> * 각각의 vertex의 최대가 되는 가중치를 dp table을 쌓아 나간다.

#### 코드설명 및 주의사항
* 각각의 vertex의 indegree가 어느 vertex에서 출발하는 것인지 저장하는 r-vector를 따로 만들어 사용하였다.
  
* tpl에 위상정렬된 순서대로 vertex값을 저장하였다.
  * DFS는 위상정렬 값이 거꾸로 저장되기 때문에 reverse함수를 이용하여 순서를 한번 뒤집어 주었다.

* 각각의 vertex를 건물이 지어지는 시간을 저장해놓은 배열 d의 위상정렬된 순서의 vertex값으로 초기화 해놓았다.

* indegree(r-vector)의 갯수에 따라 if와 else로 나눠 따로 처리했다.

* dp table에는 해당 vertex에서 시작하는 값과, 해당 vertex로 들어오는 indegree에서 오는 모든 값을 비교하여 최대값으로 저장해두었다.


#### 배운점
1. 위상 정렬을 사용하는 상황에 대해서 더 자세히 알게되었다.
2. dp를 초기화하여 채워놓고 사용하는 방법



```cpp
///////////////////////////////////
/*
      BOJ1005 ACM Craft (DFS)
*/
///////////////////////////////////
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int ii = 1;

void DFS_tpl(vector<vector<int> > &v, int* ind, int* color, int* tpl, int idx) {
	color[idx] = 1;
	int sz = v[idx].size();
	for (int j = 0; j < sz; j++) {
		int idc = v[idx][j];
		if (color[idc] == 0)
			DFS_tpl(v, ind, color, tpl, idc);
	}
	tpl[ii++] = idx;
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);

	int t;
	cin >> t;
	while (t--) {
		int n, k;
		cin >> n >> k;

		vector<vector<int> > v;
		vector<vector<int> > r;
		v.resize(n + 1);
		r.resize(n + 1);
		int d[n + 1] = {};
		int color[n + 1] = {};
		int dp[n + 1] = {};
		int ind[n + 1] = {};
		int tpl[n + 1] = {};

		for (int i = 1; i <= n; i++)
			cin >> d[i];
			
		int a, b, w;
		for (int i = 1; i <= k; i++) {
			cin >> a >> b;
			v[a].push_back(b);
			r[b].push_back(a);
			ind[b]++;
		}
		
		cin >> w;
		
		ii = 1;
		for (int i = 1; i <= n; i++) 
			if (ind[i] == 0 || color[i]==0)
				DFS_tpl(v,ind, color, tpl, i);
		
		reverse(tpl+1,tpl+n+1);
		dp[tpl[1]] = d[tpl[1]];
		
		for (int i = 1; i <= n; i++) {
			int rz=r[tpl[i]].size();
			if(rz==0)
				dp[tpl[i]] = d[tpl[i]];
			else {
				dp[tpl[i]]=d[tpl[i]];
				for(int j=0; j<rz; j++) {
					int tmp = r[tpl[i]][j];
					dp[tpl[i]] = max(dp[tpl[i]],dp[tmp]+d[tpl[i]]);
				}
			}
		}
		cout << dp[w] << '\n';
	}
	return 0;
}
```


```cpp
/////////////////////////////////
/*
     BOJ1005 ACM Craft (BFS)
*/
/////////////////////////////////
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <cstring>
using namespace std;

vector<vector<int> > v;
vector<vector<int> > r;
queue<int> q;
int d[100001];
int dp[1001];
int ind[1001];
int tpl[1001];
bool check[1001];

void BFS() {
	int ii = 1;
	while (!q.empty()) {
		int oq = q.front();
		check[oq] = 1;
		q.pop();
		int sz = v[oq].size();
		for (int j = 0; j < sz; j++) {
			int idx = v[oq][j];
			ind[idx]--;
			if (ind[idx] == 0 && !check[idx]) {
				check[idx] = 1;
				q.push(idx);
			}
		}
		tpl[ii++] = oq;
	}
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);
	cout.tie(0);

	int t;
	cin >> t;
	while (t--) {
		int n, k, w;
		cin >> n >> k;

		v.resize(n + 1);
		r.resize(n + 1);
		for (int i = 1; i <= n; i++) 
			cin >> d[i];
		
		int a, b;
		for (int i = 0; i < k; i++) {
			cin >> a >> b;
			v[a].push_back(b);
			r[b].push_back(a);
			ind[b]++;
		}
		cin >> w;

		for (int i = 1; i <= n; i++)
			if (ind[i] == 0)
				q.push(i);
		BFS();

		for (int i = 1; i <= n; i++) {
			int iz = r[tpl[i]].size();
			if (iz == 0) 
				dp[tpl[i]] = d[tpl[i]];
			
			else {
				dp[tpl[i]] = d[tpl[i]];
				for (int j = 0; j < iz; j++) {
					int tmp = r[tpl[i]][j];
					dp[tpl[i]] = max(dp[tpl[i]], dp[tmp] + d[tpl[i]]);
				}
			}
		}
		cout << dp[w] << '\n';

		v.clear();
		r.clear();
		memset(dp, 0, sizeof(dp));
		memset(tpl, 0, sizeof(tpl));
		memset(check, 0, sizeof(check));
	}
	return 0;
}
```