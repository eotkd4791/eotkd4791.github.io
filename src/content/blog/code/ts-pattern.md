---
author: 유대상
pubDatetime: 2024-10-04T14:48:48.688Z
title: "읽기 빡센 분기 선언적인 코드로 개선하기"
slug: better_if-else-switch
featured: false
draft: false
tags:
  - ts-pattern
  - pattern_matching
  - declarative_programming
description: 읽기 힘든 분기를 선언적인 코드로 개선하여 코드 가독성을 향상했던 경험을 공유합니다.
---

### # 배경

제품에 기능이 추가되면서 조건이 복잡해져서 읽기 힘들어지고, if가 중첩되는 형태로 코드가 변해갔다. 코드를 읽으면서 이 부분에서 급하게 수정이나 기능 추가를 해야하는 상황이 온다면 무척 애먹을 것 같았다. 깔끔하게 분기를 다룰 방법을 고민해보다가 `ts-pattern`이라는 라이브러리를 알게 되었다. `ts-pattern`은 함수형 프로그래밍을 검색하면 간간히 보았던 `패턴 매칭`이라는 개념을 TypeScript로 구현한 라이브러리였다. `ts-pattern`을 도입하며

### # ts-pattern 소개

### # 적용

### # 이게 최선일까?

### 참고자료

[ts-pattern을 활용하여 해결했던 것](https://www.kimcoder.io/blog/ts-pattern)
[tc39 - proposal-pattern-matching: stage1](https://github.com/tc39/proposal-pattern-matching)
