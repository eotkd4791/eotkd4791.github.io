---
title: "RESTful API란?"
categories:
  - study
tags:
  - Study
  - RESTful API
comments:
  - true
---


## RESTful API

### 정의
>Representational State Transfer
자원을 이름으로 구분하여 해당 자원의 상태를 주고 받는 모든 것을 의미한다.

### 특징
1. GET,POST만 자원에 대한 CRUD를 처리하는 기존 방식과 다르게 GET,POST,DELETE,PUT모두를 사용한다.
2. JSON, xml 등의 파일을 이용하여 데이터를 가져온다.
3. URI와 http방식을 기반으로 하여 자원에 접근한다.

### whistle On의 방식과 차이

***REST API vs MySQL + PHP(우리의 방식)***
1. 우리가 하는 방식에서는 우리가 만든 (접근이 허용된) DB밖에 진입을 못함. (우리가 만든 데이터베이스에 저장된 정보 만 사용가능)
   -> 외부의 데이터(API)를 가져올 수 없다 ex) 각 도시 별 축구경기장 현황 등..

2. REST API는 통신 규약(프로토콜, 여기서는 http)만 맺어져 있으면 그 규약(http 등) 또는 형태(json,xml)대로 데이터만 보내주면 조회 수정 삭제 등이 가능하다.

3. 나중에 외부로 정보를 전달해야 하는 상황이 있을 때, 요구하는 정보 만을 전달해야 하므로 (db전체를 줄 수 없으니) 이럴 때는 API(REST API)를 이용한다.


### 참고문헌
[☞ RESTful API](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)