---

title: "AOJ 울타리 잘라내기"
categories:
  - Algorithm
tags:
  - Algorithm
  - Recursive
  - Divide & Conquer
  - 종만북

---

## [AOJ] 울타리 잘라내기 FENCE
 [☞ [AOJ] FENCE](https://www.algospot.com/judge/problem/read/FENCE)

#### keypoint
문제의 범위를 반으로 쪼갰을 때, 가운데 자른 부분을 기준으로 그 부분을 지나지 않는 왼쪽 영역과 오른쪽 영역, 가운데 부분을 포함하는 부분, 이렇게 세 가지 경우로 나눌 수 있다. 이 세 가지 영역 중에서 가장 큰 범위를 출력한다.

---

#### 코드설명 및 주의사항
1. 처음에는 전체 범위에서 가장 작은 부분을 찾고 그 부분을 기준으로 왼쪽과 오른쪽 영역으로 나누어 탐색을 하였다. 이 때, 기준이 되는 최소값 부분은 범위에서 제외시킨다. 하지만 이 알고리즘으로 풀었을 때 최악의 경우 N²의 시간 복잡도가 나온다. 
최소값이 되는 부분을 매번 제외시키지만, 1,2,3,4,5,6,7 ... 이런 식으로 최소값인 1을 찾아 그 부분을 기준으로 왼쪽, 오른쪽 영역으로 나누고 기준인 1을 제외시킨다. 이 때, 원소의 갯수는 N-1이 된다. 그 다음 순번에서 2가 제외되면서 N-2개를 원소로 갖는다. 이 경우에 재귀의 깊이가 N만큼 깊어지기 때문에 시간초과가 날 수 있다.
2. 범위를 2등분하는 분할정복 알고리즘의 경우 재귀의 깊이가 log n이며, 시간 복잡도가 n log n가 나온다. 원소의 갯수가 계속해서 반으로 줄기 때문에 재귀의 깊이가 훨씬 줄어들며 시간 또한 빨라진다.

---

#### 배운점 및 느낀점
- 너무 어려워서 멘탈붕괴를 맛보았다.
- 처음이라 어려운 거라고 생각하고, 꾸준히 연습하자......


---

#### 소스코드
```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int dc(vector<int>& v, int left, int right) {
	if (left == right)
		return v[left];

	int mid = (left + right) / 2;
	int ret = max(dc(v, left, mid), dc(v, mid + 1, right));

	int l = mid;
	int r = mid + 1;
	int height = min(v[l], v[r]);

	ret = max(ret, height * 2);

	while (left < l || r < right) {
		if (r < right && (l == left || v[l - 1] < v[r + 1])) {
			r++;
			height = min(height, v[r]);
		}
		else {
			l--;
			height = min(height, v[l]);
		}
		ret = max(ret, height * (r - l + 1));
	}
	return ret;
}


int main() {
	ios::sync_with_stdio(0);
	cin.tie(0); cout.tie(0);

	int C; int N; int var;
	cin >> C;
	while (C--) {
		vector<int> v;

		cin >> N;
		for (int i = 0; i < N; i++) {
			cin >> var;
			v.push_back(var);
		}
		int ans = dc(v, 0, N-1);
		cout << ans << "\n";
	}
	return 0;
}

```


