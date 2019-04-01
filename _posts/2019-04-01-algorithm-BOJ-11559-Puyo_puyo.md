---
title: "BOJ11559 Puyo puyo"
categories:
  - Algorithm
tags:
  - Algorithm
  - BOJ
  - Simulation
  - BFS
  - Brute Force
---

## [BOJ11559] Puyo puyo
 ☞[[BOJ11559] Puyo puyo](https://boj.kr/11559)

##### keypoint
x,y좌표와 색깔을 동시에 지정하여 사용하기 위해서 **구조체**를 사용했다. 또한 **BFS로 완전탐색**을 하면서 '.'이 아닌 모든 부분을 탐색했고,
*4개 이상의 노드로 이루어져 있지 않다면, 그동안 채워졌던 ep.queue를 모두 pop하여 비워야한다.*
한 라운드가 끝나면 check배열을 초기화 시켜준다.
4개 이상의 노드가 모여서 한번의 폭발을 만들고, 한 라운드당 최소 한번의 폭발이 일어나면 연쇄가 발생한 것으로 생각하여 chain변수를 ++시켜준다. 라운드가 끝나면 뿌요들을 정렬시킨다.


#### 코드설명 및 주의사항
 지나온 자리를 queue에 담아놓고, ep.size가 4이상이면 터뜨리고,
 아니라면 queue에 채워진 모든 것들을 pop하여 제거한다.
 한 라운드마다 터진 모든 것들을 하나의 연쇄(chain)으로 생각하여,
 라운드 별로 한번이라도 터진다면 chain++을 해준다.
 한번도 터지지 않으면 while문을 탈출하여 chain을 출력한다.

 범위가 작았기 때문에 반복문을 중첩해서 사용할 수 있었다.

#### 배운점
queue의 사이즈를 이용하여 지나온 노드의 갯수를 파악하는것,
pair STL보다 더 편하게 느껴지는 구조체 사용법.
3개 이상의 인자가 필요할 때는 pair보다 tuple보다 구조체를 적극 활용해야겠다.

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#define H 12
#define W 6
using namespace std;

char field[14][8];
bool check[14][8];

int dx[4] = { 0,0,-1,1 };
int dy[4] = { 1,-1,0,0 };

typedef struct {
	int x;
	int y;
	char colour;
}node;

queue<node> q;
queue<node> checkq;

bool OOB(int x, int y) {
	if (H > x && x >= 0 && 0 <= y && y < W)
		return true;
	return false;
}


void BFS() {
	while (!q.empty()) {
		int ox = q.front().x;
		int oy = q.front().y;
		char oc = q.front().colour;

		checkq.push({ ox,oy,oc });
    //큐사이즈 체크하는 식으로 몇번의 뿌요가 붙어있는지 확인.
		check[ox][oy] = 1;

		q.pop();

		for (int n = 0; n < 4; n++) {
			int nx = ox + dx[n];
			int ny = oy + dy[n];
			if (OOB(nx, ny) && field[nx][ny] == oc && !check[nx][ny]) {

				node point = { nx,ny,field[nx][ny] };
				q.push(point);
				check[nx][ny] = 1;
			}
		}
	}
}


void puyodrop() {
	for (int j = 0; j < W; j++) {
		for (int i = 11; i >= 1; i--) {
			for (int k = i - 1; k >= 0; k--) {
				if (field[i][j] != '.') break;
				if (field[k][j] != '.') {
					field[i][j] = field[k][j];
					field[k][j] = '.';
					break;
				}
			}
		}
	}
}


int main() {

	for (int i = 0; i < H; i++) {
		for (int j = 0; j < W; j++) {
			cin >> field[i][j];
		}
	}

	int chain = 0;//연쇄 횟수
	int checkbomb = 1;//폭발 횟수

	while (checkbomb != 0) {
		checkbomb = 0;
		for (int i = 0; i < H; i++) {
			for (int j = 0; j < W; j++) {
				if (field[i][j] == '.') continue;
				else {
					if (!check[i][j]) {
						node point = { i, j, field[i][j] };
						q.push(point);
						BFS();

						if (checkq.size() < 4) {
							while (!checkq.empty()) checkq.pop();
						}//4덩어리보다 적으면 큐를 pop시켜서 비운다.

						else {//4덩어리보다 많거나 같으면 '.'으로 바꿔줌
							checkbomb++;
							while (!checkq.empty()) {
								int xo = checkq.front().x;
								int yo = checkq.front().y;
								field[xo][yo] = '.';
								checkq.pop();
							}
						}
					}
				}
			}
		}
		if (checkbomb > 0) chain++;
		puyodrop();
		memset(check, 0, sizeof(check));
	}
	cout << chain << '\n';
	return 0;
}
```

[^posts]: Footnote test.
