---
title: "덱 Deque"
categories:
  - Data structure
tags:
  - Data structure
  - Deque
comments:
  - true
---

## [BOJ10866] 덱
 ☞[[BOJ10866] 덱](https://www.acmicpc.net/problem/10866)

---

#### keypoint
앞과 뒤 모두에서 push,pop이 가능한 자료구조 '덱'을 연결 리스트 기반으로 구현하였다.
   
---


#### 고찰
popfront,popback연산을 수행할 때, pop이 된 이후의 노드 갯수가 0개라면, head,tail포인터가 NULL값을 가리키게 초기화해야 한다.
push연산에서 head,tail포인터가 모두 NULL을 가리키는 경우(덱이 비어있을 때)와 아닌 경우의 노드 삽입 방법이 다르기 때문이다.

---

#### 소스코드

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
using namespace std;

typedef struct _Deque {
	int data;
	_Deque* prev;
	_Deque* next;
}dqe;

int cnt, n;

typedef struct {
	dqe* head;
	dqe* tail;
}Dptr;


void PushFront(Dptr* ptr, int Ddata) {
	cnt++;
	dqe* newone = (dqe*)malloc(sizeof(dqe));
	newone->data = Ddata;
	newone->prev = NULL;

	if (ptr->head == NULL && ptr->tail == NULL) {
		newone->next = NULL;
		ptr->head = newone;
		ptr->tail = newone;
	}
	else {
		newone->next = ptr->head;
		ptr->head->prev = newone;
		ptr->head = newone;
	}
}

void PushBack(Dptr* ptr, int Ddata) {
	cnt++;
	dqe* newone = (dqe*)malloc(sizeof(dqe));
	newone->data = Ddata;
	newone->next = NULL;

	if (ptr->head == NULL && ptr->tail == NULL) {
		newone->prev = NULL;
		ptr->head = newone;
		ptr->tail = newone;
	}
	else {
		newone->prev = ptr->tail;
		ptr->tail->next = newone;
		ptr->tail = newone;
	}
}

int PopFront(Dptr* ptr) {
	if (cnt == 0) 
		return -1;
	
	else {
		cnt--;
		int temp = ptr->head->data;
		dqe* tmp = ptr->head;

		if (ptr->head->next != NULL) {
			ptr->head = ptr->head->next;
			ptr->head->prev = tmp->prev;
		}
		if (cnt == 0) {
			ptr->head = NULL;
			ptr->tail = NULL;
		}
		free(tmp);
		return temp;
	}
}

int PopBack(Dptr* ptr) {
	if (cnt == 0) 
		return -1;
	
	else {
		cnt--;
		int temp = ptr->tail->data;
		dqe* tmp = ptr->tail;

		if (ptr->tail->prev != NULL) {
			ptr->tail = ptr->tail->prev;
			ptr->tail->next = tmp->next;
		}
		if (cnt == 0) {
			ptr->head = NULL;
			ptr->tail = NULL;
		}
		free(tmp);
		return temp;
	}
}

int main() {

	Dptr* ptr = (Dptr*)malloc(sizeof(Dptr));
	ptr->head = NULL; ptr->tail = NULL;

	int T;
	scanf("%d", &T);

	while (T--) {
		char st[11] = {};
		scanf("%s", st);
		if (strcmp(st, "push_front") == 0) {
			scanf("%d", &n);
			PushFront(ptr,n);
		}
		else if (strcmp(st, "push_back") == 0) {
			scanf("%d", &n);
			PushBack(ptr,n);
		}
		else if (strcmp(st, "pop_front") == 0) 
			printf("%d\n", PopFront(ptr));
		
		else if (strcmp(st, "pop_back") == 0) 
			printf("%d\n", PopBack(ptr));
		
		else if (strcmp(st, "front") == 0) {
			if (ptr->head == NULL)
				printf("-1\n");
			else
				printf("%d\n", ptr->head->data);
		}
		else if (strcmp(st, "back") == 0) {
			if (ptr->tail == NULL)
				printf("-1\n");
			else
				printf("%d\n", ptr->tail->data);
		}
		else if (strcmp(st, "size") == 0) 
			printf("%d\n", cnt);
		
		else {//empty
			if (cnt == 0)
				printf("1\n");
			else
				printf("0\n");
		}
	}
	return 0;
}
```
