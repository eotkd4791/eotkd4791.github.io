---
title: "최소 비용 신장 트리 Minimum Spanning Tree"
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

## 최소 비용 신장 트리


---


### 정의
1. 사이클을 형성하지 않는 그래프(트리) -> 신장 트리(Spanning Tree)
2. 신장 트리는 모든 정점이 간선에 의해서 하나로 연결되어 있다.
3. 신장 트리의 모든 간선의 가중치 합이 최소인 그래프 ☞ 최소 비용 신장 트리 or 최소 신장 트리라고 한다.
4. "정점을 모두 연결하되, 거리(가중치)를 최소화 하는 형태로 간선을 만든다" -> 최소 신장 트리 문제

---

### 최소 비용 신장 트리를 만들기 위한 알고리즘

1. 프림 알고리즘 Prim's Algorithm


2. 크루스칼 알고리즘 Ⅰ Kruscal's Algorithm
-> 가중치를 오름차순으로 정렬하고, 가중치가 '작은 값'부터 '삽입'한다.

3. 크루스칼 알고리즘 Ⅱ Kruscal's Algorithm
-> 가중치를 내림차순으로 정렬하고, 가중치가 '큰 값'부터 '삭제'한다.

---
