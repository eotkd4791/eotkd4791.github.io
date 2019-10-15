---
title: "최소 비용 신장 트리 (MST)"
categories:
  - Data structure
tags:
  - Data structure
  - Graph
  - Minimum Spanning Tree
  - Kruskal
  - Prim
comments:
  - true
---

## 정의
- 사이클을 형성하지 않는 그래프(트리) -> 신장 트리(Spanning Tree)
- 신장 트리는 모든 정점이 간선에 의해서 하나로 연결되어 있다.
- 신장 트리의 모든 간선의 가중치 합이 최소인 그래프 ☞ 최소 비용 신장 트리 or 최소 신장 트리라고 한다.
- "정점을 모두 연결하되, 거리(가중치)를 최소화 하는 형태로 간선을 만든다" -> 최소 신장 트리 문제


---


## 최소 비용 신장 트리를 만들기 위한 알고리즘

1. 프림 알고리즘 Prim's Algorithm<br>
-> 어느 한 노드에서 출발하여 신장트리 집합을 단계적으로 확장해나간다. 정점 선택을 기반으로 한다.

2. 크루스칼 알고리즘 Kruskal's Algorithm<br>
-> 탐욕적인 방법으로 모든 정점을 최소 비용으로 연결하는 최적 해답을 구하는 것.


---



## 프림 알고리즘 Prim's Algorithm

1. 동작 원리 : 시작하는 노드에서 연결된 노드에서 연결된 모든 간선 중에 가중치가 가장 작은 간선을 선택하여 간선의 갯수가 노드의 갯수 - 1이 될 때까지 반복한다. 우선순위 큐를 이용하면 간편하게 구현할 수 있다.

2. 시간 복잡도 : 노드의 수 n만큼 반복하고, 가중치가 가장 작은 간선을 찾을 때의 반복횟수 = 노드의 갯수 n만큼 반복한다. 따라서 시간 복잡도는 O(n²)가 된다.


> 연습 예제  [BOJ1922 네트워크](https://www.acmicpc.net/problem/1922)

```cpp
//Prim's Algorithm
#include <iostream>
#include <vector>
#include <queue>
#include <utility>
#include <functional>
using namespace std;

int n, m;
vector<vector<pair<int, int> > > v; //인접리스트와 가중치를 저장.
bool check[1001];
typedef struct { int node; int val; }edge;
bool operator<(edge a, edge b) { return a.val > b.val; }
// 정렬 기준 -> 가중치가 낮은 간선에 우선순위를 둔다.

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0); cout.tie(0);

	priority_queue <edge> h;

	cin >> n >> m;
	v.resize(n + 1);

	int a, b, c;
	for (int i = 0; i < m; i++) {
		cin >> a >> b >> c;
		v[a].push_back(make_pair(b, c)); 
		v[b].push_back(make_pair(a, c));
	}

	check[1] = 1;
	for (int i = 0; i < v[1].size(); i++)
		h.push({ v[1][i].first, v[1][i].second });

	int edge = 1; int sum = 0;
	while (edge <= n - 1) { 
        //스패닝 트리를 만들 때 최소가 되는 간선의 갯수 = 노드의 갯수 n-1

		if (check[h.top().node]) {
			h.pop();
			continue;
		}

		int idx = h.top().node;
		sum += h.top().val;
		edge++;
		h.pop();
		check[idx] = 1;

		for (int i = 0; i < v[idx].size(); i++) {

			if (check[v[idx][i].first])
				continue;

			else
				h.push({ v[idx][i].first, v[idx][i].second });
		}
	}
	cout << sum;
	return 0;
```

---

## 크루스칼 알고리즘 Kruskal's Algorithm

1. 동작 원리<br>

    크루스칼 알고리즘 Ⅰ Kruskal's Algorithm
    -> 가중치를 오름차순으로 정렬하고, 가중치가 '작은 값'부터 '삽입'한다.
    <br><br>
    -> 간선들을 가중치의 오름차순으로 정렬하고, 낮은 가중치부터 선택한다. 이때, 사이클을 형성하는 간선은 제외한다.
    <br><br>
    크루스칼 알고리즘 Ⅱ Kruskal's Algorithm
    -> 가중치를 내림차순으로 정렬하고, 가중치가 '큰 값'부터 '삭제'한다.
    <br><br>
    -> 간선들을 가중치의 내림차순으로 정렬하고, 큰 가중치부터 삭제한다.

    > __유의 사항__
    > 간선을 추가할 때 사이클이 만들어지는지를 확인해야 한다. 새로운 간선이 이미 다른 경로에 포함되어 있는 노드들을 연결할 때 사이클이 만들어진다.
    ><br>
    > __사이클 생성 여부 확인하는 법__
    > 추가할 새로운 간선 양 끝의 정점이 같은 집합에 속해 있으면 사이클이 형성되기 때문에 이 부분을 먼저 검사한다.
    > Union find 알고리즘을 이용한다.


2. 시간 복잡도 : 간선의 갯수 E개를 정렬하는 데 O(E logE) 만큼의 시간이 든다.<br> 간선의 갯수가 적으면 "크루스칼 알고리즘", 많으면 "프림 알고리즘"이 적합하다.