---
title: "우선순위 큐(힙 Heap) Priority Queue"
categories:
  - Data structure
tags:
  - Data structure
  - Heap
  - Priority queue
comments:
  - true
---

## 우선순위 큐
 ☞[[BOJ11279] 최대 힙](https://www.acmicpc.net/problem/11279)

>이 문제에서는 노드의 값이 클수록 우선순위가 높다.

---


### 정의
들어간 순서에 상관없이 우선순위가 높은 데이터가 먼저 나온다.<br>

### 우선순위 큐 구헌방법
1. 배열 기반 
- 데이터 삽입, 삭제 과정에서 데이터를 한 칸씩 뒤로 밀거나 앞으로 당기는 연산 필요.
- 삽입의 위치를 찾기 위해서 최악의 경우, 모든 데이터와 우선순위 비교해야 할지도..
2. 연결 리스트 기반
- 삽입의 위치를 찾기 위해서 모든 데이터와 우선순위를 비교해야 할지도 ..
3. 힙(heap)
- 완전이진트리 구조를 가지고 있다.
- 부모 노드가 자식 노드보다 더 높은 우선순위를 지닌다.
- 힙을 배열로 구현하는 방법이 있다. 힙이 생성될 때 O(n log n)만큼의 시간복잡도를 갖는다.


>왼쪽 자식노드   = 부모노드의 인덱스값 * 2
>오른쪽 자식노드 = 부모노드의 인덱스값 * 2 + 1

### 삽입
1. 완전이진트리에서 번호 순서대로 노드를 삽입 하고, 우선순위 비교를 통한 노드의 정렬을 루트까지 진행한다. (bottom up)
2. 연산이 최대 이진트리의 높이 만큼 진행되므로 시간복잡도는 O(log n)

### 삭제
1. 루트에 위치하는 노드를 삭제하고, 가장 최근에 삽입 되었던 노드를 루트가 있던 자리에 넣는다.
2. 우선순위 비교를 통한 노드의 정렬을 진행한다. (top down)
3. 연산이 최대 이진트리의 높이 만큼 진행되므로 시간복잡도는 O(log n)

---

#### 소스코드

```cpp

#include <iostream>
#define INF 100000
using namespace std;

int N, x;
int num, idx = 1;
int heap[INF];

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);	cout.tie(0);

	cin >> N;
	while (N--) {
		cin >> x;
		if (x == 0) {//Delete
			cout << heap[1] << '\n';
			if (heap[1] == 0)
				continue;
			heap[1] = heap[num]; 
			heap[num--] = 0;

			idx = 1;
			while (1) {
				if (idx >= num)
					break;
				int left = idx * 2;
				int right = idx * 2 + 1;
				
				if (left > num) //Left(x), Right(x)
					break;
				
				if (left <= num && num < right) {// Left(o), Right(x)
					if (heap[idx] < heap[left]) {
						swap(heap[idx], heap[left]);
						idx = left;
						continue;
					}
					else
						break;
				}
				if (right <= num) {// Left(o), Right(o)
					if (heap[idx] <= heap[left] && heap[idx] <= heap[right]) {//both of sub trees have bigger value their super tree
						if (heap[left] >= heap[right]) {
							swap(heap[idx], heap[left]);
							idx = left;
							continue;
						}
						else {
							swap(heap[idx], heap[right]);
							idx = right;
							continue;
						}
					}
					if (heap[idx] >= heap[left] && heap[idx] <= heap[right]) {//only right sub tree have bigger value its super tree
						swap(heap[idx], heap[right]);
						idx = right;
						continue;
					}
					if (heap[idx] >= heap[right] && heap[idx] <= heap[left]) {//only left sub tree have bigger value its super tree
						swap(heap[idx], heap[left]);
						idx = left;
						continue;
					}
					if (heap[idx] >= heap[left] && heap[idx] >= heap[right])//both of them have less value
						break;
				}
			}
		}
		else {//Insert
			heap[++num] = x;
			idx = num;
			if (num == 1)
				continue;
			while (idx > 1) {
				if (heap[idx] > heap[idx / 2]) {
					swap(heap[idx], heap[idx / 2]);
					idx /= 2;
				}
				else
					break;
			}
		}
	}
	return 0;
}
```