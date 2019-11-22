---
title: "NewsAPI (RecyclerView)"
categories:
  - Android
  - Java
  - JSON
tags:
  - Android
  - Java
comments:
  - true
---

[안드로이드 디벨로퍼 웹사이트](https://developer.android.com/guide/topics/ui/layout/recyclerview)를 참고하면 수월하게 구현할 수 있다.

## 1. 라이브러리 추가하기
- build.gradle(Module.app)
- dependencies에 리사이클러뷰, 카드뷰, 프레스코, 발리를 추가한다.
  1. Fresco (프레스코) : 안드로이드 애플리케이션에 이미지를 표시하는 라이브러리, 이미지 로딩과 출력을 처리하기 때문에 생산성을 향상시킬 수 있다.
  2. Volley는 웹 요청과 응답을 단순화시키기 위해 만들어진 라이브러리이다. Request 객체를 만들고 이 객체를 Request Queue에 넣어주면 Request Queue는 알아서 웹 서버에 요청하고 응답을 받는다. Http 클라이언트 라이브러리가 제공하는 기능을 대부분 제공한다. 동시에 여러 네트워크 요청을 할 수 있다.

```
dependencies {
 'com.android.support:recyclerview-v7:28.0.0'
    implementation 'com.android.support:cardview-v7:28.0.0'
    implementation 'com.facebook.fresco:fresco:1.11.0'
    implementation 'com.android.volley:volley:1.1.1'
}
```

## 2. 레이아웃 구성하기

- 하나의 리사이클러뷰를 보여주는 레이아웃


```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="250dp"
    android:orientation="vertical">

    <android.support.v7.widget.CardView
        android:id="@+id/card_view"
        android:layout_gravity="center"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_margin="12dp"
        card_view:cardCornerRadius="4dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical"
            android:background="@null">

            <RelativeLayout
                android:layout_width="match_parent"
                android:layout_height="180dp">

                <com.facebook.drawee.view.SimpleDraweeView
                    android:id="@+id/SimpleDraweeView_image"
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:layout_alignParentBottom="true"/>

                <TextView
                    android:id="@+id/TextView_Title"
                    android:layout_width="match_parent"
                    android:layout_height="30dp"
                    android:layout_alignParentBottom="true"
                    android:gravity="center"
                    android:paddingLeft="6dp"
                    android:paddingRight="6dp"
                    android:text="어댑터 1번 보기"
                    android:textSize="20sp"
                    android:textStyle="bold"/>
            </RelativeLayout>

            <TextView
                android:id="@+id/TextView_Content"
                android:layout_width="match_parent"
                android:layout_height="70dp"
                android:text="리사이클러뷰 1"
                android:gravity="center_vertical|left"
                android:paddingLeft="6dp"
                android:paddingRight="6dp"
                android:textColor="#000000"
                android:textSize="12sp"
                android:ellipsize="end" 
                //글자가 넘치면 ...으로 보여준다.
                android:maxLines="2"/>

        </LinearLayout>
    </android.support.v7.widget.CardView>
</LinearLayout>
```

- 리사이클러뷰에 들어갈 항목을 보여준다.


```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
android:layout_width="match_parent"
android:layout_height="match_parent"
android:orientation="vertical">

<!-- A RecyclerView with some commonly used attributes -->
<android.support.v7.widget.RecyclerView
    android:id="@+id/my_recycler_view"
    android:scrollbars="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
</LinearLayout>
```

---

## 2. 리사이클러뷰를 보여줄 위치(리사이클러뷰 컴포넌트에 id를 설정하여 액티비티와 연결한다)

- 리사이클러뷰 액티비티

```java
package com.example.recyclerviewpractice1;

    import android.os.Bundle;
    import android.support.v7.app.AppCompatActivity;
    import android.support.v7.widget.LinearLayoutManager;
    import android.support.v7.widget.RecyclerView;
    import android.util.Log;

    import com.android.volley.Request;
    import com.android.volley.RequestQueue;
    import com.android.volley.Response;
    import com.android.volley.VolleyError;
    import com.android.volley.toolbox.StringRequest;
    import com.android.volley.toolbox.Volley;

    import org.json.JSONArray;
    import org.json.JSONException;
    import org.json.JSONObject;

    import java.util.ArrayList;
    import java.util.List;

public class RecyclerviewActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;
    RequestQueue queue;//전역변수로 바꾼다.

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recyclerview);
        recyclerView = findViewById(R.id.my_recycler_view);

        recyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        ((LinearLayoutManager) layoutManager).setOrientation(LinearLayoutManager.HORIZONTAL);
        queue =  Volley.newRequestQueue(this);
        getNews();
    }

    public void getNews() {
        String url ="https://newsapi.org/v2/top-headlines?country=kr&category=sports&apiKey=c8e9be2d28fb414189aa462890158209";
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject jsonObj = new JSONObject(response);
                            JSONArray arrayArticles =  jsonObj.getJSONArray("articles");
                            //가져오려는 뉴스API의 아티클이 배열구조이기 때문에 ..

                            List<NewsData> news = new ArrayList<>();
                            for (int i=0, j=arrayArticles.length(); i<j; i++)  {
                                JSONObject obj = arrayArticles.getJSONObject(i);

                                NewsData newsData = new NewsData();
                                newsData.setTitle(obj.getString("title"));
                                newsData.setUrlToImage(obj.getString("urlToImage"));
                                newsData.setContent(obj.getString("description"));
                                news.add(newsData);
                            }

                            //데이터를 NewsData클래스에서 분류한다.
                            mAdapter = new MyAdapter(news, RecyclerviewActivity.this);//받아온 입력값을 MyAdapter자바 파일의 #5부분으로 전달하는 코드
                            //fresco설정 시에 RecyclerviewActivity.this를 추가하여 준다. #6

                            recyclerView.setAdapter(mAdapter);// 그래서 이 부분에 초기값을 세팅해야한다.

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }


                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }
}
```


## 3. 상세한 내용 보여주는 것은 어댑터에서 하기 때문에 어댑터를 추가한다.

```java
package com.example.recyclerviewpractice1;

import android.content.Context;
import android.net.Uri;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;


import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.view.SimpleDraweeView;

import java.util.List;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> {
    private List<NewsData> mDataset;


    public static class MyViewHolder extends RecyclerView.ViewHolder {
        // 한 줄에 들어가는 요소를 정하는 홀더
        public TextView TextView_Title;//3번 과정 -텍스트 2개에 이미지 1개만큼 추가해준다.
        public TextView TextView_Content; //Title은 제목,Content는 본문
        public SimpleDraweeView SimpleDraweeView_image;
        public MyViewHolder(View v) {//#5
            super(v);
            //받아온 자식들
            TextView_Title               =   v.findViewById(R.id.TextView_Title);//3번 과정 및, 2번 과정 #4
            TextView_Content             =   v.findViewById(R.id.TextView_Content);
            SimpleDraweeView_image       =   v.findViewById(R.id.SimpleDraweeView_image);
            //연결을 하는 과정은 레이아웃끼리 연결하는 setContent만 하는 기존의 방식과 다르다.

            //리사이클러뷰 내부에서 특정한 어떤 부분 부분을 바꾸는 것이기 때문에 액티비티에 통째로 화면 전체를 넣는 setContentView대신에 inflate를 썼다. 

            // 따라서 findViewByid앞에 View의 변수 이름을 인자로 전달해야 한다. #4부분에서 v.find id해준다. 
            
            //why?액티비티에서 바로 찾아갈때는 액티비티 자체가 부모의 뷰이기 때문에 바로 찾아갈 수 있다.find id
            //but 여기서는 row_news의 View v가 부모이기 때문에 v.find id를 해주어야 한다.

        }
    }


    public MyAdapter(List<NewsData> myDataset, Context context) {//어댑터 최초에 세팅할 때 여기에 값을 넣어주어야 한다.(content)
        mDataset = myDataset;               //이 값을 꺼내와서 #5부분에서 보여준다.
        //String배열의 갯수만큼 반복한다.
        Fresco.initialize(context);//context를 받아올 수 있도록 RecyclerviewActivity의 #6부분의 인자값을 바꿔준다.
        //context를 받아오는 것은 메모리 누수가 날 수 있기 때문에 권장하진 않는다.
    }


    @Override
    public MyAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // 한 로고의 이미지 파일을 연결하는 부분.
        // 이 안에 들어가는 요소들은 위에 MyViewHolder
        LinearLayout v = (LinearLayout) LayoutInflater.from(parent.getContext())
                //3.여기서 원래 텍스트뷰지만 어댑터레이아웃의 최상위는 LinearLayout이기 때문에
                //LinearLayout으로 바꿔준다.
                .inflate(R.layout.row_news, parent, false);
        //1.레이아웃 이름 row_news로 변경 -> 레이아웃과 연결했고, findViewById를 통해서
        //뷰를 찾아가야한다. 해당 코드는 주석2번의 위치에서 친다.

        MyViewHolder vh = new MyViewHolder(v);//3번 과정을 수행하면 이 부분에 빨간줄이 생김
        //위에서 MyViewHolder에서 인자가 TextView로 설정되어 있기 때문에 그냥View로 바꿔준다.

        return vh;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        // 뷰 홀더가 반복되면서 이 메소드에서 값을 셋팅한다.
        //내용 바꿔주는 거.
        NewsData news = mDataset.get(position);

        holder.TextView_Title.setText(news.getTitle());
        holder.TextView_Content.setText(news.getContent());
        Uri uri = Uri.parse(news.getUrlToImage());
        holder.SimpleDraweeView_image.setImageURI(uri);
        //이미지의 주소를 가져오기 위한 것이 fresco
    }




    @Override
    public int getItemCount() {
        return mDataset== null ? 0 : mDataset.size();//원래는 length지만 어레이리스트이기 때문에 size를 써준다.
        //에러가 날 수 있기 때문에 mDataset이 null일 경우 0을 출력해준다.
    }
}
```

- 인터넷을 사용하기 위해서 Manifest에 해당 코드를 추가한다.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```


- 데이터 분류 용도


```java
package com.example.recyclerviewpractice1;


import java.io.Serializable;

public class NewsData implements Serializable {//데이터 분류 용도
    private String title;
    private String urlToImage;
    private String content;//캡슐화를 위해 private으로 선언한다.

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrlToImage() {
        return urlToImage;
    }

    public void setUrlToImage(String urlToImage) {
        this.urlToImage = urlToImage;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

```


