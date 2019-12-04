---
title: "JavaScript 프로토타입과 상속"
categories:
  - JavaScript
tags:
  - JavaScript
---

### 프로토타입 Prototype

생성자 함수가 있을 때 new연산자를 써서 인스턴스를 만들면 생성자함수의 prototype이라는 프로퍼티가 인스턴스의 __proto__라는 프로퍼티에 전달이 된다. 생성자 함수의 프로토타입과 인스턴스의 __proto__라는 프로퍼티는 같은 객체를 참조한다. __proto__는 내부 프로퍼티(instance의 프로퍼티)에 접근할 때 생략이 가능하다. 따라서 생성자의 prototype이 인스턴스의 내부 프로퍼티에 접근하는 것과 같아보인다(실제로 이렇지는 않지만,,)

아래 네 가지 방식에 의해서 생성자 함수의 프로토타입에 접근할 수 있다.

```js
[CONSTRUCTOR].prototype
[instance].__proto__
[instance]
Object.getPrototypeOf([instance])

아래 다섯 가지 방식에 의해서 생성자 함수에 접근할 수 있다.
[CONSTRUCTOR]
[CONSTRUCTOR].prototype.constructor
(Object.getPrototypeOf([instance])).constructor
[instance].__proto__.constructor
[instance].constructor
//__proto__는 생략이 가능하다는 것을 명심하자.
```

### 상속

```js
function Person(n, a) {
    this.name = n;
    this.age = a;
}

var daesang = new Person('대새미', 27);
var developer = new Person('개발자', 28);

daesang.setOlder = function() {
    this.age += 1;
}
daesang.getAge = function() {
    return this.age;
}
developer.setOlder = function() {
    this.age += 1;
}
developer.getAge = function() {
    return this.age;
}
/* 중복 코드가 많다.
-----------------------------------------*/

function Person(n, a){
    this.name = n;
    this.age = a;
}

Person.prototype.setOlder = function() {
    this.age += 1;
}

Person.prototype.getAge = function() {
    return this.age;
}

var daesang = new Person('대새미', 27);
var developer = new Person('개발자', 28);

/* 코드의 반복이 위의 코드보다 적다.
-----------------------------------------*/
```

```js
daesang.__proto__setOlder();
daesang.__proto__getAge();

// 여기서 this는 daesang.__proto__를 가리키기 때문에 결과는 NaN이다. 그런데 __proto__는 생략이 가능하기 때문에 마치 this가 마치 자신의 것처럼 메소드를 호출할 수 있게된다. 

/* 아래 코드와 같이 된다.
-----------------------*/
daesang.setOlder();
daesang.getAge();
// 따라서 결과는 28.

//만약 아래와 같은 명시적 표기가 있다면
Person.prototype.age = 100;

daesang.__proto__.setOlder();
daesang.__proto__.getAge();
//결과는 101

daesang.setOlder();
daesang.getAge();
//결과 31

/* 메소드 호출 시,this가 어떻게 바인딩 되는지에 따라 다르기 때문.
----------------------------------------------------*/
```

### 프로토타입 체이닝

Array인스턴스는 Array의 생성자 함수와 Array.prototype로 이루어져 있다. Array.prototype에는 배열의 메소드들이 담겨있다. __proto__는 생략이 가능하기 때문에 배열 인스턴스가 마치 자신의 메소드인것처럼 호출이 가능하다. 그런데 프로토타입이 객체라는 말은 곧 오브젝트 생성자 함수의 뉴연산자로 생성된 인스턴스라는 말이 되고 따라서 오브젝트의 프로토타입을 상속받게 된다. 따라서 오브젝트의 프로토타입에 있는 메소드 역시 사용할 수 있게 되었다.
<br>
<br>
모든 데이터 타입에는 생성자 함수가 존재한다. 생성자 함수의 프로토 타입에는 각 데이터 타입에만 해당하는 메소드들이 정의되어 있다. 모든 데이터 타입에 대해서 생성자 함수의 __proto__로 연결된 Object.prototype에는 자바스크립트 전체를 통괄하는 공통된 메소드들이 정의되어 있다. 하지만 다른 데이터 타입이 프로토타입 체이닝을 통해 접근할 수 있기 때문에 Object.prototype에는 객체에만 정의되는 메소드를 정의할 수 없다. Object.prototype에 적용되는 메소드는 모든 데이터 타입에 적용되기 때문이다. 따라서 prototype이 아닌 Object객체 생성자 함수 자체에 메소드를 정의할 수 밖에 없었다. 객체 리터럴에서 Object가 자주 등장하는 이유가 바로 이 때문이다. 

```js
var arr = [1, 2, 3];
arr.toString = function() {
    return this.join('_');
}

console.log(arr.toString());
//1_2_3
console.log(arr.__proto__.toString.call(arr));
//1,2,3 (arr의 생성자 함수에 있는 prototype)
console.log(arr.__proto__.__proto__.toString.call(arr));
//[object Array] (Object의 prototype)
```

```js
var obj = {
    a: 1,
    b: {
        c: 'c'
    },
    toString: function() {
        var res = [];
        for(var key in this) {
            res.push(ket + ': ' + this[key].toString());
        }
        return '{' + res.join(', ') + '}';
    }
};
console.log(obj.toString());

/* 위의 코드를 출력하면 b는 object Object, toString함수는 그대로 나온다.
이 코드에 프로토타입을 이용하면 아래와 같다.
-------------------------------------------------------*/

var obj = {
    a: 1,
    b: {
        c: 'c'
    }
};
Object.prototype.toString = function() {
    var res = [];
        for(var key in this) {
            res.push(ket + ': ' + this[key].toString());
        }
        return '{' + res.join(', ') + '}';
    }
}
console.log(obj.toString());

/* 제대로 나온다.
----------------------------------------------------*/
```
