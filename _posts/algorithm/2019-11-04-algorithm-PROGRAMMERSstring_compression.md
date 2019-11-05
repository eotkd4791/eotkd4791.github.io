---
title: "Programmers 문자열 압축"
categories:
  - Algorithm
tags:
  - Algorithm
  - String
comments:
  - true
---

## [Programmers] 문자열 압축
 ☞[[Programmers] 문자열 압축](https://programmers.co.kr/learn/courses/30/lessons/60057)

---

#### keypoint
1. 가장 많이 잡을 수 있는 문자의 갯수가 파라미터로 들어온 문자열의 반 만큼의 길이이다. 
(1 ~ s.size()/2)
2. 압축한 문자열의 반복횟수 만큼 숫자를 붙여줘야한다. ex) abab->2ab 
3. 문자열에 숫자를 담는 것보다 하나의 특정 문자를 추가하는 것이 더 간편하다고 판단하고 'T'를 추가하였다.
4. 압축횟수가 10이 넘어가면 자릿수가 2가 되므로 자릿수만큼 T를 추가한다.


---

#### 코드 설명

<span style= "color:red">___주석참고!!___</span>

---

#### 소스코드

```cpp
#include <string>
#include <vector>
using namespace std;

int solution(string s) {
	int MIN = s.size(); //문자열의 길이로 초기화를 시켜둔다.

	for (int i = 1; i <= s.size() / 2; i++){
    //하나의 문자를 잡는 경우부터 문자열 길이의 절반 만큼 잡는 경우의 수까지 탐색.
		int init = 0; int cnt = 1;
        //init = 탐색의 시작점, cnt압축이 발생한 횟수
		string tmp = ""; string ans = "";

		while (init <= s.size()) {//시작점이 문자열의 길이를 초과하면 탈출
			if (tmp == s.substr(init, i)) 
				cnt++;
			
			else {
				if (cnt > 1) {//압축이 진행되었을 때
					while (cnt > 0) {//cnt가 0보다 클 때까지(자릿수 만큼 while문 반복!!)
						ans.push_back('T'); 
						cnt /= 10;
					}
				}
				cnt = 1;//다시 1로 초기화
				tmp = s.substr(init, i);
                //다음 탐색할 그룹과 비교하여 압축 가능 여부를 확인하기 위해 압축된 문자열을 tmp에  갱신,,
			}
			init += i;
            //시작점을 다음 그룹으로 바꿔준다.

			if (cnt == 1) //압축이 한번도 발생하지 않았거나, tmp에 저장된 문자열과 다음 그룹의 문자열이 다를 경우에 cnt를 1로 초기화했다.
            //따라서 cnt가 1인 경우에는 ans벡터에 그대로 push해주고 다음 그룹의 문자열 탐색을 진행한다.
				for (int j = 0; j < tmp.size(); j++)
					ans.push_back(tmp[j]);
		}
		MIN = MIN > ans.size() ? ans.size() : MIN;
        //시작점(init)이 문자열 길이를 초과하여 반복문을 탈출하면 ans벡터에 저장된 문자열의 길이를 확인한다. MIN값보다 작다면 갱신, 아니라면 그대로 두고 다음 단계 진행.
	}
	return MIN;
}
```