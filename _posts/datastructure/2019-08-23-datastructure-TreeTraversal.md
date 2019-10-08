---
title: "트리 순회 Tree Traversal"
categories:
  - Data structure
tags:
  - Data structure
  - Study
  - Theory
  - Tree
  - Preorder
  - Inorder
  - Postorder
comments:
  - true
---


## 트리 순회 Tree Traversal
[☞ [BOJ1991] 트리 순회](https://www.acmicpc.net/problem/1991)

### 1. 트리 구현(연결 리스트 기반)

1. N값 만큼 알파벳을 넣어서 노드를 만들고 next멤버를 이용하여 알파벳 순서 별로 연결을 해놓았다.
2. 첫 노드를 생성할 때와 그 이후의 노드를 생성할 때를 구분하였다.
3. 입력을 받을 떄에는 왼쪽 자식 노드와 오른쪽 자식 노드의 주소값을 저장하는 lsub,rsub멤버변수를 이용하였다.
- (입력값이 '.'이 아닐 때만 수행할 수 있도록 조건을 구현하였다.)
4. 제한 시간이 2초이고, N값이 가장 클 때 26이기 때문에 시간이 넉넉할 것이라고 판단하고, 루트로 돌아와서 다시 탐색을 시작하는 방식으로 왼쪽 자식과 오른쪽 자식을 연결하였다.

### 2. 전위 순회 Preorder

```cpp
void preorder(tree* pptr) {
	cout << pptr->data;
	if (pptr->left != NULL)
		preorder(pptr->left);
	if (pptr->right != NULL)
		preorder(pptr->right);
}
```

### 3. 중위 순회 Inorder

```cpp
void inorder(tree* pptr) {
	if (pptr->left != NULL)
		inorder(pptr->left);
	cout << pptr->data;
	if (pptr->right != NULL)
		inorder(pptr->right);
}
```

### 4. 후위 순회 Postorder

```cpp
void postorder(tree* pptr) {
	if(pptr->left!=NULL)
		postorder(pptr->left);
	if(pptr->right!=NULL)
		postorder(pptr->right);
	cout << pptr->data;
	free(pptr);
}
//후위 순회가 마지막 연산이므로 출력한 노드의 동적 할당을 해제한다.
```

#### 소스코드

```cpp
//BOJ1991 트리 순회
#include <iostream>
#include <cstdlib>
using namespace std;

int N;

typedef struct _tree {
	char data;
	_tree* left;
	_tree* right;
	_tree* next;
}tree;

typedef struct {
	tree* head;
	tree* cur;
	tree* lsub;
	tree* rsub;
}ptr;

void preorder(tree* pptr) {
	cout << pptr->data;
	if (pptr->left != NULL)
		preorder(pptr->left);
	if (pptr->right != NULL)
		preorder(pptr->right);
}
void inorder(tree* pptr) {
	if (pptr->left != NULL)
		inorder(pptr->left);
	cout << pptr->data;
	if (pptr->right != NULL)
		inorder(pptr->right);
}
void postorder(tree* pptr) {
	if(pptr->left!=NULL)
		postorder(pptr->left);
	if(pptr->right!=NULL)
		postorder(pptr->right);
	cout << pptr->data;
	free(pptr);
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	ptr* tr = (ptr*)malloc(sizeof(ptr));
	tr->head = NULL; tr->cur = NULL; tr->lsub = NULL; tr->rsub = NULL;

	cin >> N;
	for (int i = 0; i < N; ++i) {
		tree* newnode = (tree*)malloc(sizeof(tree));
		newnode->data = 'A' + i;
		newnode->left = NULL;	newnode->right = NULL;
		newnode->next = NULL;

		if (i == 0) {
			tr->head = newnode;
			tr->cur = tr->head;
		}
		else {
			tr->cur->next = newnode;
			tr->cur = tr->cur->next;
		}
	}

	char p, l, r;
	for (int i = 0; i < N; ++i) {
		tr->cur = tr->head; tr->lsub = tr->rsub = tr->cur;
		cin >> p >> l >> r;
		
		while (tr->cur->data != p) 
			tr->cur = tr->cur->next;
		
		if (l != '.') {
			while (tr->lsub->data != l)
				tr->lsub = tr->lsub->next;
			tr->cur->left = tr->lsub;
		}

		if (r != '.') {
			while (tr->rsub->data != r)
				tr->rsub = tr->rsub->next;
			tr->cur->right = tr->rsub;
		}
	}
	preorder(tr->head);
	cout << '\n';
	inorder(tr->head);
	cout << '\n';
	postorder(tr->head);
	return 0;
}
```

**참고문헌**
* 윤성우 [자료구조] Introduction to Data Structures Using C
