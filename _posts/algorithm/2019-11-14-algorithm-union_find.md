---
title: "유니온 파인드 Union-Find"
categories:
  - Java
tags:
  - Java
---

### 유니온 파인드(Union-Find)란?
- 서로소 집합 (상호 배타적 집합 => Disjoint Set) : 공통 원소가 없도록 나눈 집합.
- 유니온 파인드 : 상호 배타적인 부분 집합들로 나눠진 원소들에 대한 정보를 저장하고 조작하는 자료구조

### 유니온 파인드의 연산
- 초기화 : n개의 원소가 각각의 집합에 포함되어 있도록 만든다.
- 합치기(union) : 두 원소 a,b가 주어질 때 이들이 속한 두 집합을 하나로 합친다.
- 찾기(find) : 어떤 원소가 주어질 때 이 원소가 속한 집합을 반환한다.
>union, find 이 두 연산을 지원한다고 해서 유니온 파인드라고 부른다.

### 알고리즘
- "배열"로 disjoint set 구현
  - 합치기 연산 : 모든 원소를 순회하면서 한 집합을 이루는 원소들을 다른 집합에 모두 옮겨야함 ->O(n)
  - 찾기 연산은 배열의 인덱스를 참조하는 방식이기 때문에 O(1)시간에 가능하다.

- "트리"로 disjoint set 구현
  - 트리는 오직 하나의 루트만을 갖고 있기 때문에 루트에 있는 원소를 각 집합의 대표라고 한다.
  - 각 원소가 포함된 트리의 루트를 찾고 비교한다.
  - 각 노드들은 부모 노드에 대한 정보를 가지고 있어야한다. 따라서 parent(벡터)배열을 선언하여 어느 집합에 속해있는지 표시해준다. 루트 노드는 부모 노드가 없으므로 자기 자신을 가리키게 한다.
  - 찾기 연산은 a원소에서 루트에 닿을 때까지 재귀함수호출을 수행한다. -> 트리 높이에 비례 O(n)
  - 합치기 연산은 a,b원소가 속해있는 집합(루트)을 찾고 둘 중 하나의 집합을 다른 하나의 집합(루트)의 자손으로 저장해준다. -> 집합(루트)을 찾는 과정이 수반되므로 마찬가지로 트리 높이에 비례 O(n)
  - 트리를 만듦으로 인해 배열로 구현할 때보다 더 안좋은 성능을 지닌다. 따라서 최적화가 필요하다.

- 최적화
  - "랭크에 의한 합치기 (union-by-rank) 최적화"
  - 연산 순서에 따라 트리가 한쪽으로 치우칠 수가 있다. -> 이는 트리의 높이가 상당히 커지기 때문에, 연산의 속도에 직접적인 영향을 끼친다.
  - 따라서 트리의 높이를 따로 저장해두고 높이가 작은 쪽의 트리를 큰 쪽의 서브트리로 붙이는 방식으로 진행한다. 만약 두 원소가 속해있는 트리의 높이가 같다면 높이를 기존의 높이 + 1로 저장해준다.(why? 높이가 같은 두 트리 중 하나가 다른 트리 루트의 자손에 붙여진다면 높이는 기존 트리의 높이 + 1이 되기 때문에..) 
  - 이러한 방식으로 연산을 하면 트리의 높이가 유지되거나 1씩 증가한다 따라서 시간복잡도는 O(n) -> O(log N)이 된다.
 
  - "경로 압축(path compression) 최적화"
  - find로 루트를 찾아낼 때 재귀호출을 이용하였는데 루트를 찾아 반환되면서 parent배열에 저장된 부모노드의 번호를 해당 트리의 루트로 바꿔주면 경로를 훨씬 단축할 수 있다.
  - 이렇게 두 가지의 최적화를 모두 적용하면 시간복잡도 분석은 찾기 연산 함수를 호출할 때마다 수행 시간이 바뀌기 때문에 상당히 까다로움.
  - 평균 시간 O(α(n))이 되는데 α(n)는 아크만 함수이다. 모든 크기 n에 대해 4 이하의 값이다. ---> n이 아무리 커도 상수시간에 해결이 가능하다.

### 연습문제
- [BOJ1717 집합의 표현](https://www.acmicpc.net/problem/1717)

```cpp
#include <iostream>
#include <vector>
using namespace std;

int N, M, c, a, b;
vector<int> parent, level;

int search(int u) 
{
	if (parent[u] == u) return u;
	return parent[u] = search(parent[u]);
}

void merge(int u, int v) 
{
	int ru = search(u); int rv = search(v); //root 구하기
	if (ru == rv) return;

	if (level[ru] > level[rv]) 
		parent[rv] = ru;

	else if (level[ru] < level[rv])
		parent[ru] = rv;

	else
	{
		parent[ru] = rv;
		level[ru]++;
	}
}

int main() 
{
	ios::sync_with_stdio(0);
	cin.tie(0);

	cin >> N >> M;
	for (int n = 0; n <= N; n++) 
	{
		parent.push_back(n);
		level.push_back(1);
	}
	
	for (int m = 0; m < M; m++)
	{
		cin >> c >> a >> b;
		if (c==0) //Union
			merge(a, b);
		
		else	  //Find
		{
			if (search(a) == search(b))
				cout << "YES" << '\n';
			else
				cout << "NO" << '\n';
		}
	}
	return 0;
}
```

### 참고문헌
>프로그래밍 대회에서 배우는 알고리즘 해결 전략 -구종만 저