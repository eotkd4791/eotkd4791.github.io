---
author: 유대상
pubDatetime: 2024-01-24T16:43:06.135Z
title: "React Client Component(RCC)와 React Server Component(RSC) 어떻게 동작할까?"
slug: rcc_vs_rsc
featured: false
draft: false
tags:
  - react_client_component
  - react_server_component
description: React Client Component와 React Server Component가 어떻게 동작하는지 간략하게 살펴봅니다.
---

### # 클라이언트 컴포넌트 (React Client Component 이하 RCC)

- 클라이언트 환경에서 렌더링되는 컴포넌트
- 클라이언트가 javascript 번들을 다운로드 받은 후 해석한다.

### # 서버 컴포넌트 (React Server Component 이하 RSC)

- 서버에서 렌더링되는 컴포넌트.
  - 서버에서 한차례 해석된 후 클라이언트로 전달된다.
- 번들 크기 0.
- 보안에 더 좋다.
  - 서버 리소스로 직접 접근.
  - 민감 정보 보관.

> 클라이언트 컴포넌트와 서버 컴포넌트는 각각 장단점을 모두 가지고 있다.
> 따라서 RCC, RSC를 적재적소에 배치하여 각 컴포넌트의 장단점을 살리면서 개발하는 것이 좋다.

### # RSC 동작 방식

1. 사용자가 서버에 페이지 요청
2. 서버는 컴포넌트 트리를 root부터 실행하며 `직렬화된 json 형태`로 재구성
   - 이 과정에서 함수는 직렬화 불가 **_(실행 컨텍스트, 스코프, 클로저까지 직렬화할 수는 없기 때문)_**
3. 다만 RCC는 일종의 함수이기 때문에 json형태로 직렬화하지 않는다. module reference라고 하는 새로운 타입으로 적용하고, 경로를 명시한다. 이러한 방법으로 직렬화를 우회한다.
4. 이렇게 생성한 결과물을 stream 형태로 클라이언트에게 전달한다.
5. 서버로부터 전달받은 js bundle을 참조하여 module reference를 채워넣고 렌더링하면, 화면에 나타나게 된다.

### # RSC의 제약사항

#### RSC에서 RCC로 직렬화가 불가능한 객체를 prop으로 넘길 수 없다.

- RSC끼리는 prop을 통해서 함수를 전달할 수 있지만, 서버에서 렌더링되는 RSC 특성상 굳이 함수를 넘길 필요가 없다.
- server action을 사용하면 RSC에서 RCC로 함수를 전달할 수 있다.
  - 다만 해당 함수의 ==파라미터와 반환값은 모두 직렬화가 가능해야한다.==
  - [ ] server action으로 선언한 함수를 RSC에서 RCC로 함수를 넘기는 것은 함수 자체를 넘기는 것보다는 api 명세를 넘기는 것인지..?

#### RCC는 RSC를 직접 `return` 할 수 없으며, 반드시 `render prop (children)` 형태로 넘겨야한다.

- RCC는 RSC에서 실행되지 않기 때문에 RCC 내부에서 반환되는 RSC또한 서버에서 실행되지 못한다.
  - RSC임에도 불구하고 RCC와 같이 클라이언트 환경에서 동작하게 된다.
  - 하지만 render prop으로 RSC를 넘기면 사실상 공통 부모가 렌더링되는 시점에 RSC가 실행이 되고, 그 결과값을 children으로 전달할 수 있다.

```tsx
function ContainerServerComponent() {
	return (
		<ParentClientComponent>
			<ChildrenServerComponent />
		</ParentClientComponent>
	);
}

function ParentClientComponent({ children }) {
	return <div onChange={...}>{children}</div>;
}

function ChildrenServerComponent() {
	return <div>server component</div>;
}
```

- `ChildrenServerComponent` 는 `ParentClientComponent`의 자식이지만, 공통 부모인 `ContainerServerComponent` 가 렌더링되는 시점에 `ChildrenServerComponent`가 렌더링되고 그 결과가 `ParentClientComponent`로 넘겨진다. ([참고자료](https://velog.io/@2ast/React-children-prop%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0feat.-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94))

```js
{
  // The ClientComponent element placeholder with "module reference"
  $$typeof: Symbol(react.element),
  type: {
    $$typeof: Symbol(react.module.reference),
    name: "default",
    filename: "./src/ParentClientComponent.js"
  },
  props: {
    children: {
      $$typeof: Symbol(react.element),
      type: "div",****
      props: {
        children: "server component"
      }
    }
  }
}
```

> 참고자료
> [Next) 서버 컴포넌트(React Server Component)에 대한 고찰](https://velog.io/@2ast/React-%EC%84%9C%EB%B2%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8React-Server-Component%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0)
