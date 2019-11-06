---
title: "Programmers 실패율"
categories:
  - Algorithm
tags:
  - Algorithm
  - Programmers
  - Implement
  - Brute_force
comments:
  - true
---

## [Programmers] 실패율
 ☞[[Programmers] 실패율](https://programmers.co.kr/learn/courses/30/lessons/42889)

---

#### keypoint
1. stages벡터에 저장되어 있는 값을 이용하여 각각의 stage가 몇 번 클리어됬는지(done), 몇 번 클리어되지 않았는지(yet)를 저장해두어야 한다.
2. stages 벡터의 크기(사용자수)로 done 변수를 초기화하고, 각각 stage마다 클리어하지 못한 사용자 수가 저장되어 있는 배열yet을 done값에서 빼면서 진행한다.
3. 문제에서 제시한 정렬 기준에 맞게 정렬한 후에 answer벡터에 stage값을 담아서 반환한다.

---

#### 코드 설명
<span style= "color:red">___주석참고!!___</span>

---

#### 고찰
1. done변수를 배열로 구현하여 하나하나 카운트하는 방식으로 풀이하여 AC를 받았지만 성능이 좋지 않은 알고리즘이었다.
2. done변수를 stages백터의 크기로 초기화한 후, 1~N까지 반복하는 for문을 돌면서 0이 아닌 값이 저장되어 있다면 done에서 해당 값을 빼주는 방식으로 구현하였다.
3. 이러한 방법으로 코드를 수정하니 시간이 훨씬 줄어든 것을 알 수 있었다.

---

#### 소스코드

```cpp
#include <vector>
#include <algorithm>
#include <utility>
using namespace std;

bool comp(pair<float, int> a, pair<float, int> b) {
	if (a.first > b.first) //실패율이 높은 순서대로 내림차순.
		return true;

	else if (a.first == b.first) //실패율이 같다면
		return (a.second < b.second); //스테이지 번호가 작을 수록 우선 순위가 높다.

	else
		return false;
}

vector<int> solution(int N, vector<int> stages) {
	int done = stages.size();
	int yet[505] = {};

	for (int i = 0; i < stages.size(); i++) 
		yet[stages[i]]++;
	//입력받은 벡터의 크기만큼 반복하면서 아직 클리어하지 못한 스테이지의 정보를 기록한다.

	vector<pair<float, int> > v;
	for (int i = 1; i <= N; i++) {
		if (yet[i] == 0) 
		//yet이 0이라면 해당 스테이지를 클리어하고 있는 사용자가 없다는 것을 의미한다.
		//->해당 스테이지를 클리어한 사용자와 아직 도달하지 못한 사용자만 존재한다는 뜻.
			v.push_back(make_pair(0, i));//따라서 실패율=0으로 벡터에 담아준다.
	
		else {
			float var = (float)yet[i] / done;
			v.push_back(make_pair(var, i));
			done -= yet[i];
			//yet의 값이 0이 아니라면 해당 스테이지를 클리어하지 못한 사용자가 존재한다는 의미이다.
			//해당 스테이지를 클리어해야 다음 스테이지로 넘어가기 때문에 실패율을 계산하여 벡터에 담고,
			//done변수에서 해당 스테이지를 클리어하지 못한 사용자수를 제외시킨다.
			//그러면 다음 스테이지까지 도달한 사용자수만 남게된다.
		}
	}

	sort(v.begin(), v.end(), comp);
	//정렬 기준에 맞게 정렬을 한다.

	vector<int> answer;
	for (int i = 0; i < v.size(); i++) 
		answer.push_back(v[i].second);
	//answer벡터에 담아서 반환한다.
	return answer;
}
```