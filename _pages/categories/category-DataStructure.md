---
title: "Post about DataStructure"
layout: archive
permalink: /categories/DataStructure
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.DataStructure | sort:"date" %}

{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}
