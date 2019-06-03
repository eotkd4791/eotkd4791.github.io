---
title: "Database01"
categories:
  - Theory
tags:
  - Theory
  - Database

comments:
  - true
---

## Database01

### 데이터베이스 개념
```
  * 데이터베이스 정의
    * 통합 데이터 Integrated Data
    * 저장 데이터 Stored Data
    * 운영 데이터 Operational Data
    * 공유 데이터 Shared Data
```

```
  * 데이터베이스 특징
    * 실시간 접근성 Real Time Accessibility
    * 계속적인 진화 Continuous Evolution
    * 동시 공유 Concurrent Sharing
    * 내용에 의한 참조 Content Reference
    * 데이터의 논리적, 물리적 독립성 Independence
```

```
  * 데이터베이스 시스템
    * 정의
    * 구성 요소
```
```
  * 데이터 언어 Data Language

    * 데이터 정의어 Data Definition Language (DDL)
      * 구조, 데이터 형식, 접근 방식의 구축이나 변경
      * CREATE DROP ALTER
      * 기능
      * 데이터베이스의 논리적, 물리적 구조를 정의 및 변경
      * 스키마(Schema)에 사용되는 제약 조건 정의
      * 데이터의 물리적 순서 규정

    * 데이터 조작어 Data Manipulation Language
      * 응용 프로그램과 데베관리시스템 간의 인터페이스
      * 검색 삽입 삭제 갱신
      * INSERT DELETE UPDATE
      * 형태
        - 절차적 데이터 조작어
        - 비절차적 데이터 조작어

    * 데이터 제어어 Data Control Language
      * 보안, 권한제어, 무결성, 회복, 병행제어
      * REVOKE GRANT
```

```
  * 데이터베이스 사용자

    * 데이터 베이스 관리자(DBA: DataBase Administrator)
      * DDL,DCL로 데베를 정의, 제어하는 사람이나 그룹
      * 상당한 지식 보유해야함
      * 설계 관리 운영 통제하며, 시스템감시와 성능 분석

    * 데이터 관리자(Data Administrator)
      * 기업 또는 조직 전반의 데이터 관리를 총괄.
      * 중앙 집중적인 계획 수립 및 통제

    * 데이터 설계자(Data Architect)
      * 데이터 구조를 체계적으로 정의

    * 응용 프로그래머(Application Programmer)
      * DML을 삽입하여 데베에 접근하는 사람.

    * 일반 사용자(End User)
      * 질의어(Query Language)를 통해 데이터베이스 관리 시스템에 접근하는 사람.
```    

### 데이터베이스 관리 시스템(DBMS)
```
* 데이터베이스 관리 시스템(DataBase Management System)
  * 중복성, 종속성 문제 해결.
    * 데이터 종속성으로 인한 문제점
      * 저장 방법이나 접근 방법 변경 시 응용프로그램도 변경 해야함.
    * 데이터 중복성으로 인한 문제점
      * 일관성, 보안 수준, 정확성, 무결성 유지 어려움.
```
```
* 데이터베이스 관리 시스템 필수 기능
  * 정의 기능 Definition Facility
    * 데이터 타입과 구조, 저장 시 제약조건 등을 명시
  * 조작 기능 Manipulation Facility
    * 데이터 접근 기능(검색, 삽입, 삭제, 갱신) 명시
  * 제어 기능 Control Facility
    * 데이터의 정확성, 안전성 유지를 위해 무결성, 보안 및 권한 검사, 병행 제어 등 명시
```
```
* DBMS 장단점

  * 장점
    * 데이터의 논리적, 물리적 독립성이 보장
    * 공동 이용가능
    * 표준화
    * 무결성 유지
    * 실시간 처리
    * 중복 줄일 수 있다.
    * 통합하여 관리 가능
    * 일관성 유지
    * 보안 유지
    * 항상 최신 데이터 유wl

   * 단점
    * 데이터데이스 전문가 부족
    * 대용량 디스크로의 집중적인 접근으로 과부하 발생
    * 전산화 비용 증가
    * 데이터 백업과 회복이 어렵다
    * 시스템이 복잡해진다.
```

### 스키마
```
* 스키마(Schema)의 개념
 * 데이터베이스의 구조와 제약 조건에 관한 전반적인 명세(Specification)
 * 개체(Entity), 속성(Attribute), 관계(Relationship) 및 제약 조건 등에 관해 전반적으로 정의
 * 사용자 관점에 따라
    * 외부 스키마(External Schema)
    * 내부 스키마(Internal Schema)
    * 개념 스키마(Conceptual Schema)
```
```
* 스키마의 특징
   * 데이터의 구조적 특성
   * 데이터사전(Data Dictionary)에 저장된다.
   * 현실 세계의 특정한 한 부분의 표현으로서 특정 데이터 모델을 이용해서 만들어짐
   * 시간에 따라 불변인 특성 지님
   * 데이터의 논리적 단위에 명칭을 부여, 그 의미를 서술
```
```
* 데이터 사전(Data Dictionary)
 - 데이터 사전은 데이터베이스에 저장되어 있는 모든 데이터 개체들에 대한 정보를 유지, 관리하는 시스템
 - 시스템 카탈로그

* 메타 데이터(Meta Data)
  * 데이터에 관한 데이터
  * 실제 저장되는 데이터는 아니지만, 저장되는 데이터와
  직,간접적으로 관계가 있는 정보를 제공하는 데이터

  * 메타 데이터 포멧
    * MARC(Machine Readable Cataloging)
      - 목록 레코드를 식별하여 축적, 유통할 수 있도록 코드화한 메타 데이터

    * DC(Dublin Core)
      - 네트워크 환경에서 각종 전자 정보를 기술하는 메타 데이터

    * ONIX(ONline Information eXchange)
      - 유통에 관한 통계와 체계적인 정보를 취급함으로써 정상적인 유통 및 관리를 위한 메타 데이터

    * MODS(Metadata Object Description Schema)
      - 디지털 도서관의 범용 서지 정보 표준 메타 데이터로서 MARC, DC, ONIX 등을 절충하여 상호 운용성과 정밀성을 모두 만족시킴

# 메타 데이터의 상호운용성을 확보하기 위한 방법
  - 자원을 하나의 표준적인 메타 데이터로 표현하는 방법
  - 다양한 메타 데이터형식과 기술 구조를 인정, 상호 매핑을 통해 해결하는 방법
  - MDR(Meta Data Registry)에 의한 해결 방법
    + MDR : 메타 데이터 등록,인증을 통해 유지,관리하고, 명세를 공유하는 레지    
```

```
* 스키마의 3계층
  * 외부 스키마
    - 사용자나 프로그래머가 각 개인의 입장에서 필요로 하는 데이터베이스의 논리적 구조를 정의한 것이다.
    - 외부 스키마는 전체 데이터베이스의 한 논리적인 부분으로 볼 수 있으므로 서브 스키마(Sub Schema)라고도 함.
    - 하나의 DBMS당 여러 외부 스키마 존재가능, 하나의 스키마를 여러 프로그램이나 사용자에 의해 공유될 수 있다.
    - 외부 스키마는 동일한 데베에 대해 서로 다른 관점 정의 허용

  * 개념 스키마
    - 개체 간의 관계, 제약조건, 데베의 접근 권한, 보안 정책 및 무결성 규정에 관한 명세 정의 한 것.
    - 데베의 전체적인 논리적 구조 -> 모든 응용 프로그램이나 사용자들이 필요로 하는 데이터를 통합한 조직 전체의 데베 명세, #오직 하나만 존재#
    - 단순히 스키마라고 하면 개념 스키마 의미
    - 기관이나 조직의 관점에서 데베를 정의한 것.
    - 데베 관리자에 의해 작성

    * 내부 스키마
      - 데베의 물리적 구조 정의
      - 물리적 저장장치 관점, 하나만 존재
      - 개념 스키마의 물리적 저장 구조에 대한 정의
      - 시스템 프로그래머나 설계자가 보는 관점
```

### 데베 설계

```
* 데베 설계 개념
  - 데베 스키마를 개발하는 과정
  1. 요구 조건 분석 Requirement Analysis
  2. 개념적 설계 Conceptual Design
  3. 논리적 설계 Logical Design
  4. 물리적 절계 Physical Design
  5. 데베 구현 Database Implementation
  - 데베 구조에 치중하는 데베 중심 설계(Data-driven)와 데이터 처리,응용에 치중하는 처리 중심(Processing-driven)을 병행
  ```
