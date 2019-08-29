---
title: "RaspberryPi-LED test"
categories:
  - RaspberryPi
tags:
  - RaspberryPi
  - 라즈베리파이
comments:  
  - true
---



### #1 도입

 {% include RaspberryPi/LED_test.html id="https://www.youtube.com/embed/GCSLqmMmUZ0" %} 

간단한 LED회로 구성을 하고 파이썬을 이용하여 LED의 깜빡거림을 구현해 보았다.

### #2 각 포트별 역할 및 번호

![라즈베리파이 포트 번호](/assets/img/RaspberryPi/LEDtest.png)

### #3 소스코드

```python
import RPi.GPIO as GPIO 
# RPi.GPIO 일반 입출력 라이브러리를 import해준다.
# 이름이 너무 길기 때문에 as라는 명령어를 사용하여 GPIO로 줄여쓴다. C의 typedef와 같다.

import time 
# 시간 조절

GPIO.setmode(GPIO.BCM)
# BCM은 라즈베리파이의 포트와 관련이 있다.

print "Setup LED with GPIO"

GPIO.setup(23, GPIO.OUT) 
GPIO.setup(24, GPIO.OUT)
# 23,24는 라즈베리파이 포트 번호.
try:
    while True:
        GPIO.output(23, True) 
        time.sleep(1)
        GPIO.output(23, False)
        time.sleep(1)
        GPIO.output(24, True)
        time.sleep(1)
        GPIO.output(24, False)
        time.sleep(1)
except KeyBoardInterrupt:
    GPIO.cleanup()

```