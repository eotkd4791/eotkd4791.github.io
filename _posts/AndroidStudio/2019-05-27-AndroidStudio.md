## AndroidStudio-01

---

![](C:\blog\assets\img\Android)

- 안드로이드는 액티비티와 레이아웃 파일이 쌍을 이룬다.
- Gradle 빌드(배포,개발) 환경을 구성해준다.
- res (resource)
- main-res-layout에 xml파일이 위치한다.
- AndroidManifest.xml 앱의 기본 설정이 코딩되어 있다.
- proguard 보안 설정.


## AndroidStudio-02

---

- Virtual Device
  - 단말기에 맞게 설정한다.
  - Nexus 6 1440x2560px, 560dpi가 요즘 대세.

- TextView
  - match는 꽉 채운다는 뜻.
  - 너비와 높이는 꼭 정해준다.
  - 글씨를 보여주는 역할
  - gravity 앱 전체를 기준으로 정렬하기
  - layout_gravity 부모 기준에서 정렬위치 정하기 
  - wrap 크기에 맞게 채우기.


## AndroidStudio-03

---

- Layout
- 
    - TextView를 쓰면 많은 것을 담을 수가 없기 때문에 부모로 쓰는 것을 비효율.

    - LinearLayout 이나 RelativeLayout을 쓴다.
      - Linear : 요소들이 가로/세로로 배치된다.
        - 방향은 android:orientation="horizontal" -가로 / vertical 세로


    - RelativeLayout : 부모-자식 관계를 지킨다.
      - 위치 설정을 따로 하지 않으면 겹쳐서 나타난다.
      - 1을 센터(부모님의 센터)로 위치 시킨다. layout_centerInParent="true"
        - 관계를 정의했다고 표현한다.
      - id를 설정해서 구체적인 위치를 표현한다.android:id=@+id/~~~~
        - android:layout_toLeftOf="@+id/~~~" // toRightOf

- weightSum값을 설정하여 layout_weight명령어를 이용하여 레이아웃을 등분할 수 있다.
  - wrap_content대신 match_parent를 사용하면 화면을 꽉 채울 수 있다.


``` xml
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



## AndroidStudio-04