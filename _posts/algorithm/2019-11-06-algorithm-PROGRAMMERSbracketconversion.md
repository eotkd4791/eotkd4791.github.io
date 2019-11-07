---
title: "Programmers 괄호 변환"
categories:
  - Algorithm
tags:
  - Algorithm
  - String
  - Divide & Conquer
comments:
  - true
---

## [Programmers] 괄호 변환
 ☞[[Programmers] 괄호 변환](https://programmers.co.kr/learn/courses/30/lessons/60058)

---

#### 문제 설명
함수의 인자값으로 들어오는 괄호 문자열을 문제에서 설명하는 과정을 통해서 "올바른 괄호 문자열"로 변환하여 반환하는 문제이다. (인자값으로 들어오는 문자열의 길이는 짝수이며, 2이상 1000이하 길이의 문자열이다. '('와 ')'의 갯수는 항상 같다.)

#### keypoint
1. 인자로 받은 문자열을 더이상 쪼갤 수 없는 균형잡힌 문자열u와 나머지 문자열v로 나누어 문제에서 제시한 과정을 통해서 올바른 괄호 문자열로 바꾸면서 다시 합치는 분할정복 문제이다.
2. 괄호가 짝이 맞는지 확인하는 isright함수를 따로 만들었다. 스택을 활용하여 인자로 들어온 문자열의 문자가'('면 스택에 푸쉬하고 ')'면 스택에서 pop시키는 방식으로 구현하였다.
3. u와 v를 계속해서 분할하다가 v의 값이 NULL일 때 기저조건을 구현하여 반환되게 구현하였다.
4. V에 재귀호출된 v의 값을 쌓아

---

#### 코드 설명

<span style= "color:red">___주석참고!!___</span>

---

#### 고찰
- 괄호의 갯수를 셀 때, '('의 갯수보다 ')'의 갯수가 많아지면 이는 "올바른 괄호 문자열"이 아니라는 것을 의미한다. 이러한 특징을 이용했다면 스택 사용으로 인한 메모리를 줄일 수 있었다.
- 재귀함수를 따로 만들 필요 없이 solution함수를 그대로 재귀로 구현할 수 있었다.
- solution함수의 인자값으로 들어온 문자열p를 나눈 u와 v를 끝까지 분할하고 다시 정복하면서 문자열 v는 항상 "올바른 괄호 문자열"이기 때문에 문자열 v를 isright라는 함수를 "올바른 괄호 문자열"인지 검사할 필요가 없었다.
- 분할정복의 특징 제대로 이해해야겠다. 
- (이 문제와 상관없이) dp와 분할정복은 주어진 문제를 작게 나누어 해결하는 면에서는 같지만, dp는 계산한 결과를 저장해놓고 그 결과를 재사용한다는 면에서 분할정복과 다르다.


#### 소스코드

```cpp
#include <string>
#include <stack>
using namespace std;

bool isright(string str)
{
	if (str == "")
		return true;
	stack<char> s;
	bool flag = false;
	for (int i = 0; i < str.size(); i++)
	{
		if (str[i] == '(')
			s.push(str[i]);
		else
		{
			if (!s.empty())
				s.pop();
			else
			{
				flag = true;
				break;
			}
		}
	}
	if (!s.empty() || flag)
		return false;
	else
		return true;
}

string recur(string s) {
	if (s == "")
		return s;

	int left = 0; int right = 0;
	for (int i = 0; i < s.size(); i++)
	{
		if (s[i] == '(')
			left++;

		if (s[i] == ')')
			right++;

		if (left > 0 && right > 0 && left == right)
			break;
	}
	string u = s.substr(0, left + right);
	string v = "";
	if (left + right < s.size())
		v = s.substr(left + right, s.size() - (left + right));

	string V = recur(v);

	if (isright(u))
	{
		return u + V;
	}
	else
	{
		string tmp = "(";
		tmp += V;
		tmp.push_back(')');

		for (int i = 1; i < u.size() - 1; i++) {
			if (u[i] == '(')
				tmp.push_back(')');
			else
				tmp.push_back('(');
		}
		return tmp;
	}
}

string solution(string p) {
	if (isright(p))
		return p;
	else
	{
		string answer = recur(p);
		return answer;
	}
}
```

