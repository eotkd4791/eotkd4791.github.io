---
title: "BOJ2150 Strongly Connected Component"
categories:
  - Algorithm
tags:
  - Algorithm
  - BOJ
  - Graph
  - SCC
  - Strongly Connected Component
  
comments:
  - true
---

## [BOJ2150] Strongly Connected Component
 [☞ [BOJ2150] Strongly Connected Component](https://www.acmicpc.net/problem/2150)

#### keypoint
>* Stack에 쌓인 노드들을 discover하면서 push하고 return하면서 pop 한다.
> * forward edge의 경우, tree edge로 간주하고 진행한다.
> * cross edge의 경우, 내가 탐색하고 있는 노드(w)가 SCC를 이루고 있는지 아닌지의 여부를 판단한다.

#### 코드설명 및 주의사항
* Stack을 pop할 때, while문이 break되면서 K값이 1만큼 더 증가하기 때문에 정답 출력 시에 -1을 해주어야 한다.

* 출력 시에 노드를 오름차순으로, 각 SCC 멤버별로 묶어서 추력해야 한다.



#### 배운점
* *벡터를 resize로 크기 설정을 해주면 메모리를 아낄 수 있다.*
* *SCC로 이미 묶였는지 아닌지의 여부를 판단할 때, 내가 바라보고 있는 노드인 w가 scc를 이루고 있는지 판단해야한다.
if(scc[v]==0)으로 코드를 작성하여 실수했다.
실전이었다면 못 찾았을 것 같다. 주의하자 제발.*


```cpp
//////////////////////////////
/*
        BOJ2150 SCC
                            */
//////////////////////////////

#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
#define INF 10005
using namespace std;

int V, E;
vector<vector<int> > adj;
stack<int> discoverStack;
int discoverTime[INF];
int finishTime[INF];
int time;
int scc[INF];
int low[INF];
int check[INF];
bool checkp[INF];
int K = 1;

void DFS(int v) {
	discoverStack.push(v);
	check[v] = 1;
	discoverTime[v] = ++time;
	low[v] = discoverTime[v];

	int sz = adj[v].size();
	for (int i = 0; i < sz; i++) {
		int w = adj[v][i];
		if (check[w] == 0) {//white
			DFS(w);
			low[v] = min(low[v],low[w]);
		}

		if (check[w] == 1) //gray
			low[v] = min(low[v], discoverTime[w]);

		if (check[w] == 2) {//black
			if (discoverTime[v] < discoverTime[w]) {
        //forward edge
				continue;
			}

			else if(discoverTime[v] > finishTime[w]) {
        //cross edge
				if (scc[w] == 0) {//scc로 묶이지 않았다면
					low[v] = min(low[v], low[w]);
				}
				else //이미 묶였다면 무시
					continue;
			}
		}
	}

	check[v] = 2;
	finishTime[v] = ++time;
	if (low[v] == discoverTime[v]) {
    //해당 노드가 해당노드의 후손노드에서 출발한
    //백엣지가 가리키는 노드라면,
		while (1) {
			int idx = discoverStack.top();
			scc[idx] = K;
			discoverStack.pop();
			if (idx == v) {
        //스택에서 top이 노드v라면,
				K++;
				break;
			}
		}
	}
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);
	cout.tie(0);

	cin >> V >> E;
	adj.resize(V + 1);

	int a, b;
	for (int i = 0; i < E; i++) {
		cin >> a >> b;
		adj[a].push_back(b);
	}

	for (int i = 1; i <= V; i++)
		if (check[i] == 0)
			DFS(i);

	cout << K - 1 << "\n";
	for (int i = 1; i <= V; i++) {
		if (!checkp[i]) {
			checkp[i] = 1;
			cout << i << " ";
			for (int j = i + 1; j <= V; j++) {
				if (scc[i] == scc[j]) {
					checkp[j] = 1;
					cout << j << " ";
				}
			}
			cout << "-1" << "\n";
		}
	}
	return 0;
}
```
