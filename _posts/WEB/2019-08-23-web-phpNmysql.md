---
title: "PHP와 DB 연동하기"
categories:
  - MYSQL
  - PHP
tags:
  - Database
  - PHP
  - MySQL
  - 생활코딩
comments:
  - true
---

## 데이터베이스, PHP 연동하기 (feat.생활코딩)

### #1 도입
Web browser -----> Web server -> PHP -> MySQL
PHP(미들웨어) 중간 역할을 한다.

사용자가 php확장자명의 파일을 웹서버에게 보내면 웹서버가 처리를 못하기 때문에 php에게 보낸다.

### #2 PHP와 MYSQL의 연동 작업
MYSQL서버 - MYSQL 모니터
모니터는 보여주는 역할을 하므로 MYSQL의 클라이언트라고 할 수 있다.
PHP도 MYSQL서버에 대해서 클라이언트로서 동작할 수 있다.(PHP에서 제공하는 함수를 이용!)

### #3 연동 작업 2
PDO_MySQL -> MYSQL이 아닌 다른 관계형 DB를 사용하더라도 PHP 코드 수정없이 MYSQL을 수정할 수 있다.


```php
<?php
// mysqli
$mysqli = new mysqli("example.com", "user", "password", "database");
$result = $mysqli->query("SELECT 'Hello, dear MySQL user!' AS _message FROM DUAL");
$row = $result->fetch_assoc();
echo htmlentities($row['_message']);

// PDO
$pdo = new PDO('mysql:host=example.com;dbname=database', 'user', 'password');
$statement = $pdo->query("SELECT 'Hello, dear MySQL user!' AS _message FROM DUAL");
$row = $statement->fetch(PDO::FETCH_ASSOC);
echo htmlentities($row['_message']);

// mysql
$c = mysql_connect("example.com", "user", "password");
mysql_select_db("database");
$result = mysql_query("SELECT 'Hello, dear MySQL user!' AS _message FROM DUAL");
$row = mysql_fetch_assoc($result);
echo htmlentities($row['_message']);
?>
```