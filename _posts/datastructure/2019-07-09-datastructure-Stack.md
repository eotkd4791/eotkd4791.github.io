---
title: "스택 Stack"
categories:
  - Data structure
tags:
  - Data structure
  - Study
  - Theory
  - Stack
  - 스택
comments:
  - true
---


## 스택 Stack
- 스택에 먼저 들어간 자료가 가장 나중에 나온다. Last In First Out

### 1. 배열 기반 스택 Array Based Stack
#### 구현
```cpp
#include <stdio.h>
#include <stdlib.h>
#define STACK_LEN 100
using namespace std;

typedef struct {
	int stackArr[STACK_LEN];
	int topIndex;
} Stack;

void StackInit(Stack* pstack) {//스택 생성
	pstack->topIndex = -1;
}

int SIsEmpty(Stack* pstack) {//스택이 비었는지 확인
	if (pstack->topIndex == -1)
		return 1;
	else
		return 0;
}

void SPush(Stack* pstack, int data) {//스택의 push연산
	pstack->topIndex += 1;
	pstack->stackArr[pstack->topIndex] = data;
}

int SPop(Stack* pstack) {//스택의 pop연산
	int rIdx;
	if (SIsEmpty(pstack)) {
		printf("Stack Memory Error!");
		exit(-1);
	}
	rIdx = pstack->topIndex;
	pstack->topIndex -= 1;
	return pstack->stackArr[rIdx];
}

int SPeek(Stack* pstack) {//스택의 peek연산
	if (SIsEmpty(pstack)) {
		printf("Stack Memory Error!");
		exit(-1);
	}
	return pstack->stackArr[pstack->topIndex];
}

int main() {
	Stack stack;
	StackInit(&stack); //스택 생성, 초기화

	SPush(&stack, 1); SPush(&stack, 2);
	SPush(&stack, 3); SPush(&stack, 4);
	SPush(&stack, 5);
    // 데이터 삽입
	
	while (!SIsEmpty(&stack))
		printf("%d ", SPop(&stack));
    //데이터 출력
	return 0;
}
```

### 2. 연결 리스트 기반 스택 Linked List Based Stack
- 연결 리스트를 이용하여 스택을 구현하였다.
- head가 최근에 삽입된 노드를 가리키도록 구현하였다.


#### 구현

```cpp
#include <cstdio>
#include <cstdlib>
using namespace std;

typedef struct _node {
	int data;
	struct _node* next;
}Node;

typedef struct _listStack {
	Node* head;
}Stack;

void StackInit(Stack* pstack) {
	pstack->head = NULL;
}

int SIsEmpty(Stack* pstack) {
	if (pstack->head == NULL)
		return 1;
	else
		return 0;
}

void SPush(Stack* pstack, int data) {
	Node* newnode = (Node*)malloc(sizeof(Node));
	newnode->data = data;
	newnode->next = pstack->head;
	pstack->head = newnode;
}

int SPop(Stack* pstack) {
	int rdata;
	Node* rnode;

	if (SIsEmpty(pstack)) {
		printf("Stack Memory Error!");
		exit(-1);
	}

	rdata = pstack->head->data;
	rnode = pstack->head;

	pstack->head = pstack->head->next;
	free(rnode);

	return rdata;
}

int SPeek(Stack* pstack) {

	if (SIsEmpty(pstack)) {
		printf("Stack Memory Error!");
		exit(-1);
	}

	return pstack->head->data;
}
int main() {
	Stack stack;
	StackInit(&stack);

	SPush(&stack, 1);
	SPush(&stack, 2);
	SPush(&stack, 3);
	SPush(&stack, 4);
	SPush(&stack, 5);

	while (!SIsEmpty(&stack))
		printf("%d ", SPop(&stack));
	
	return 0;
}
```


**참고문헌**
* 윤성우 [자료구조] Introduction to Data Structures Using C
