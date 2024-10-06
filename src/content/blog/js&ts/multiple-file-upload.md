---
author: 유대상
pubDatetime: 2024-10-04T14:48:48.688Z
title: "여러 개의 파일 업로드 기능 만들면서 생각한 것들 I"
slug: developing_file-uploading
featured: false
draft: false
tags:
  - file-upload
description: 파일 업로드 기능을 구현하면서 생각한 것들을 정리한 글입니다.
---

### # 배경

`여러 개의 파일을 업로드`하는 기능을 개발하는 프로젝트에 참여하게 되었다. 어떻게 개발할지를 고민하는 과정을 정리해두고자 이 포스팅을 작성하기로 했다. 가장 먼저 떠오른 것은 업로드 방식이었다. 여러 개의 파일을 업로드할때 순차적으로 처리되면 사용자 경험이 매우 저하될 것 같았다. 이를 개선하는 방법을 고민해보았다.

특정 사용자는 간혹 30개 ~ 50개의 파일을 업로드한다는 이력이 있었다. 또, 업로드 가능한 파일 확장자도 이미지 뿐만 아니라, pdf, docx, xlsx도 있었다. 여러 개를 한번에 올렸을 때, HTTP 요청이 순차적으로 처리된다면 사용자가 체감하는 대기시간은 매우 길어진다. 이는 사용자 경험을 최악으로 만들 수 있다. 그래서 병렬적으로 처리하는 것을 고려했다. HTTP 요청을 병렬적으로 전송하려면 어떻게 해야할지 고민하고 공부했던 과정을 공유한다.

###

###

### # 참고자료

[Does JavaScript Promise.all() run in parallel or sequential? by Leo's dev blog](https://www.leohuynh.dev/blog/does-promise-all-run-in-parallel-or-sequential)
[Running JavaScript Promises In Parallel](https://blog.openreplay.com/promises-in-parallel/)
