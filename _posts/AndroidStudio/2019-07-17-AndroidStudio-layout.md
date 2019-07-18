---
title: "AndroidStudio01"
categories:
  - AndroidStudio
tags:
  - AndroidStudio
  - App
  - layout
---
## AndroidStudio-01
- 안드로이드는 액티비티와 레이아웃 파일이 쌍을 이룬다.
- Gradle 빌드(배포,개발) 환경을 구성해준다.
- res (resource)
- main-res-layout에 xml파일이 위치한다.
- AndroidManifest.xml 앱의 기본 설정이 코딩되어 있다.
- proguard 보안 설정.


## AndroidStudio-02
- Virtual Device
  - 단말기에 맞게 설정한다.
  - Nexus 6 1440x2560px, 560dpi가 요즘 대세.

- TextView
  - match는 꽉 채운다는 뜻.
  - 너비와 높이는 꼭 정해준다.
  - 글씨를 보여주는 역할
  - gravity 해당하는 요소의 범위에서 정렬하기
  - layout_gravity 부모 기준에서 정렬위치 정하기
  - wrap 크기에 맞게 채우기.

---

## AndroidStudio-03



- Layout

- TextView를 쓰면 많은 것을 담을 수가 없기 때문에 부모로 쓰는 것을 비효율.

- LinearLayout 이나 RelativeLayout을 쓴다.
- Linear : 요소들이 가로/세로로 배치된다.
- 방향은 android:orientation="horizontal" 
  - -가로 / vertical 세로


- RelativeLayout : 부모-자식 관계를 지킨다.
- 위치 설정을 따로 하지 않으면 겹쳐서 나타난다.
- 1을 센터(부모님의 센터)로 위치 시킨다. layout_centerInParent="true"
- 관계를 정의했다고 표현한다.
- id를 설정해서 구체적인 위치를 표현한다.android:id=@+id/~~~~
- android:layout_toLeftOf="@+id/~~~" // toRightOf

- weightSum값을 설정하여 layout_weight명령어를 이용하여 레이아웃을 등분할 수 있다.
  - wrap_content대신 match_parent를 사용하면 화면을 꽉 채울 수 있다.


```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="1"
        android:textSize="20sp"
        android:layout_toLeftOf="@+id/TextView_2"
        android:layout_centerInParent="true"
        //센터인데 부모의 센터이다.
        //이러한 작업을 관계를 정의했다고 한다.
        >

     </TextView>
    <TextView
        android:id="@+id/TextView_2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="2"
        android:textSize="20sp"
        android:layout_centerInParent="true"
        >

    </TextView>
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="3"
        android:textSize="20sp"
        android:layout_toRightOf="@+id/TextView_2"
        android:layout_centerInParent="true"
        >
    </TextView>
</RelativeLayout>
```
> centerInparent(부모의 중앙으로 정렬)/  centerInHorizontal(가로 정렬'|')/ centerInVertical(세로 정렬'-')
 toRightOf=id/ toLeftOf / above / below


---

## AndroidStudio-04
- 이미지 삽입 시 src나 background를 쓰는데 background=@null로 설정하고 src를 이용한다 background는 할당된 공간을 꽉 채우도록 사진을 배치하기 때문에 앱상에서 찌그러질 수 있다.

## AndroidStudio-05
- build.gradle(Module.app)에서 implementation 입력해야함.
입력하고 sync를 한다.
support design 종속성 식별자. 입력시 build.gradle(Module.app)내의 디펜던시 버전이 모두 같아야 한다.

- 이미지 삽입 시, res->drawble 디렉토리에 이미지 파일을 복붙한다.
  되도록이면 png파일형식으로, 파일이름은 소문자로.
  원래 사이즈는 device definition에서 사용할 가상머신의 연필그림을 누르고 dpi로 설정해주어야한다.
- 이미지 설정 시, 백그라운드를 널로 설정해주고 src="@drawble/이미지명"으로 미리 drawable 폴더에 저장해놓았던 파일을 가져온다.
- 버튼 백그라운드 만들기
  1. drawble xml파일을 하나 만들고 첫줄만 남긴다.(<xml version~~>)
  2. <selector xmls:안드로이드 스키마 apk res>태그를 연다
  3. item 상태설정
  4. shape 이 상태일 때, 모양이 이렇다.
  5. 채워 줄때 <solid>
  6. <corner> 로그인 버튼 둥그렇게 깎아주는 것. 숫자가 적을수록 꺾임이 적다(직각일때 0) radious= 20dp
   


```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_enabled="true">
        <shape>
            <solid android:color="@color/colorPrimaryDark">
                
            </solid>
            <corners android:radius="20dp">
                
            </corners>
        </shape>
    </item>
</selector>

```
- EditText입력 시, 힌트 위로 올라가는 디자인.
```xml
 <android.support.design.widget.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <android.support.design.widget.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:hint="Email">
        </android.support.design.widget.TextInputEditText>
    </android.support.design.widget.TextInputLayout>
```
- 가장자리 조절할 떄는 padding을 쓴다.

- 버튼에 이미지 삽입-> LinearLayout에 버튼과 이미지를 horizontal방식으로 일렬로 배치한다. 버튼 크기를 맞춘다.
---

## AndroidStudio-06
```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
   <item android:state_pressed="true">
        <shape android:shape="rectangle">
            <corners android:radius="100dp"/>
            <solid android:color="#ffff00"/>
        </shape>
   </item> <!--눌렀을 때-->
    <item>
        <shape android:shape="rectangle">
            <corners android:radius="100dp"/>
            <solid android:color="@color/colorPrimaryDark"
        </shape>
    </item><!--일반 상태-->
    <item android:state_enabled="false">
        <shape android:shape="rectangle">
            <corners android:radius="100dp"/>
            <solid android:color="#777777"/>
        </shape>
    </item><!--누르고 나서 클릭이 안되게 하는 상태-->
</selector>
<!--해당 버튼이 존재하는 레이아웃에 android:enabled="false"입력해준다.
그러면 2번째 아이템의 색깔이 나온다.-->
```
## AndroidStudio-07
**액티비티 활용**
- EditText에서 값을 가져오고, 로그인 버튼 누르고(.setClickable) 버튼을 클릭했을 때 클릭을 감지하고(setOnCLickListener), 값들을 가져오는(getText) 것 구현
```java
package com.example.sample;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;

public class MainActivity extends AppCompatActivity {

    EditText  EditText_email,  EditText_password;
    LinearLayout LinearLayout_login;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        EditText_email      = findViewById(R.id.EditText_email);
        EditText_password   = findViewById(R.id.EditText_password);
        LinearLayout_login  = findViewById(R.id.LinearLayout_login);



        LinearLayout_login.setClickable(true);
        LinearLayout_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String Email = EditText_email.getText().toString();
                String Password = EditText_password.getText().toString();
                
                Intent intent = new Intent(this, LoginResultActivity.class);
                intent.putExtra("email",email);
                intent.putExtra("password",password);
                startActivities(intent);
            }
        });
    }
}

```
## AndroidStudio-08