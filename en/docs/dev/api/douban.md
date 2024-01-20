#### Overview

Refer to [API documenetations](https://douban-api-docs.zce.me/).

**Notes**: Its base url is <https://api.douban.com> and the method of the request is **GET** unless otherwise stated.

#### OAuth

Douban supports three ways of OAuth.

#### User

###### UserInfo

/v2/user/{user_id}
Example: <https://api.douban.com/v2/user/1000001>

#### Movie

##### subject

Refer to []().

```http
/v2/movie/subject/{subject_id}
```

```json
{
  "id": "1764796",
  "title": "机器人9号",
  "original_title": "9",
  "aka": ["9：末世决战", "九", "Number 9", "机器人9号"],
  "alt": "https://movie.douban.com/subject/1764796/",
  "mobile_url": "https://movie.douban.com/subject/1764796/mobile",
  "year": "2009",
  "languages": ["英语"],
  "countries": ["美国"],
  "genres": ["科幻", "动画"], // 3 at most
  "durations": ["79 分钟"],
  "subtype": "movie", // movie/tv
  "mainland_pubdate": "",
  "pubdates": ["2009-09-09(美国)"],
  "pubdate": "", // deprecated
  "share_url": "http://m.douban.com/movie/subject/1764796",
  "website": "",
  "douban_site": "",
  "images": {
    "small": "http://img1.doubanio.com/view/photo/s_ratio_poster/public/p494268647.jpg",
    "large": "http://img1.doubanio.com/view/photo/s_ratio_poster/public/p494268647.jpg",
    "medium": "http://img1.doubanio.com/view/photo/s_ratio_poster/public/p494268647.jpg"
  },
  "has_schedule": false, // 影讯
  "schedule_url": "", // movie only
  "bloopers": [], // 花絮
  "blooper_urls": [],
  "trailers": [], // 预告片
  "trailer_urls": [], // 4 at most
  "clips": [], // 片段
  "clip_urls": [], // 4 at most
  "tags": ["动画", "科幻",...],
  "wish_count": 19347,
  "do_count": null, // defaults to 0 if tv else null
  "collect_count": 92273,
  "seasons_count": null, // tv only
  "current_season": null, // tv only
  "episodes_count": null, // tv only
  "summary": "机器人9号（伊利亚•伍德 Elijah Wood 饰）突然醒来，……©豆瓣",
  "collection": null,
  "has_ticket": false,
  "ratings_count": 67399,
  "rating": {
    "max": 10,
    "average": 7.5,
    "details": {
      "1": 212.0,
      "3": 16543.0,
      "2": 1640.0,
      "5": 8213.0,
      "4": 22969.0
    },
    "stars": "40",
    "min": 0
  },
  "directors": [], // refer to #simple-celebrity
  "writers": [], // ditto
  "casts": [], // ditto, 4 at most
  "comments_count": 10042, // short ones
  "popular_comments": [], // first 10, refer to #comment
  "photos_count": 145,
  "photos": [], // first 10, refer to #simple-photo
  "reviews_count": 308, // former ones, commonly in the form of articles
  "popular_reviews": [], // first 10, refer to #simple-review
  "has_video": true,
  "videos": [
    {
      "source": {
        "literal": "qq",
        "pic": "http://img3.doubanio.com/f/movie/0a74f4379607fa731489d7f34daa545df9481fa0/pics/movie/video-qq.png",
        "name": "腾讯视频"
      },
      "sample_link": "http://v.qq.com/x/cover/uzuqdig87eggmiw.html?ptag=douban.movie",
      "video_id": "uzuqdig87eggmiw",
      "need_pay": true
    }
  ]
}
```

###### photos

Refer to [Photo](#photo) and [Simple Subject](#simple-subject).

```http
/v2/movie/subject/{subject_id}/photos?start=0&count=20
```

```json
{
  "start": 0,
  "count": 20,
  "total": 48,
  "photos": [], // refer to #photo
  "subject": {} // refer to #simple-subject
}
```

###### reviews

Refer to [Review](#review) and [Simple Subject](#simple-subject).

```http
/v2/movie/subject/{subject_id}/reviews?start=0&count=20
```

```json
{
  "start": 0,
  "count": 20,
  "next_start": 20,
  "total": 9750,
  "reviews": [], // refer to #review
  "subject": {} // refer to #simple-subject
}
```

###### comments

Refer to [Comment](#comment) and [Simple Subject](#simple-subject).

```http
/v2/movie/subject/{subject_id}/comments?start=0&count=20
```

```json
{
  "start": 0,
  "count": 20,
  "next_start": 20,
  "total": 392428,
  "comments": [], // refer to #comment
  "subject": {} // refer to #simple-subject
}
```

##### celebrity

Refer to [Simple Subject](#simple-subject) and [Simple Photo](#simple-photo).

```http
/v2/movie/celebrity/{celebrity_id}
```

```json
{
  "id": "1054521",
  "name": "蒂姆·罗宾斯",
  "name_en": "Tim Robbins",
  "alt": "https://movie.douban.com/celebrity/1054521/",
  "mobile_url": "https://movie.douban.com/celebrity/1054521/mobile",
  "avatars": {
    "small": "http://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.jpg",
    "large": "http://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.jpg",
    "medium": "http://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.jpg"
  },
  "summary": "蒂姆·罗宾斯，原名蒂莫西·佛朗西斯·罗宾斯（Timothy Francis Robbins），...",
  "aka": [],
  "aka_en": ["Timothy Francis Robbins (本名)"],
  "website": "",
  "gender": "男",
  "birthday": "1958-10-16",
  "born_place": "美国,加利福尼亚州,西科维纳",
  "professions": ["", "", "导演", "制片人", "编剧"],
  "constellation": "天秤座",
  "works": [], // 5 at most, refer to #simple-subject
  "photos": [], // 10 at most, refer to #simple-photo
}
```

###### photos

Refer to [Photo](#photo) and [Simple Celebrity](#simple-celebrity).

```http
/v2/movie/celebrity/{celebrity_id}/photos?start=0&count=20
```

```json
{
  "start": 0,
  "count": 20,
  "total": 58,
  "photos": [], // refer to #photo
  "celebrity": {} // refer to #simple-celebrity
}
```

###### works

Refer to [Simple Subject](#simple-subject) and [Simple Celebrity](#simple-celebrity).

```http
/v2/movie/celebrity/{celebrity_id}/works?start=0&count=20
```

```json
{
  "start": 0,
  "count": 20,
  "total": 89,
  "works": [], // refer to #simple-subject
  "celebrity": {} // refer to #simple-celebrity
}
```

##### top250

Refer to [Simple Subject](#simple-subject).

```http
/v2/movie/top250?start=0&count=20
```

```json
{
    "count": 20,
    "start": 0,
    "total": 250,
    "subjects": [], // refer to #simple-subject
    "title": "豆瓣电影Top250"
}
```

##### weekly

Refer to [Simple Subject](#simple-subject).

```http
/v2/movie/weekly
```

```json
{
    "subjects": [], // refer to #simple-subject
    "title": "豆瓣电影本周口碑榜"
}
```

##### new movies

Refer to [Simple Subject](#simple-subject).

```http
/v2/movie/new_movies
```

```json
{
    "subjects": [], // refer to #simple-subject
    "title": "豆瓣电影新片榜"
}
```

##### in theaters

Refer to [Simple Subject](#simple-subject).

```http
/v2/movie/in_theaters?start=0&count=20&city=北京
```

```json
{
    "count": 20,
    "start": 0,
    "total": 0,
    "subjects": [], // refer to #simple-subject
    "title": "正在上映的电影-北京"
}
```

##### coming soon

Refer to [Simple Subject](#simple-subject).

```http
/v2/movie/coming_soon?start=0&count=20
```

```json
{
    "count": 20,
    "start": 0,
    "total": 0,
    "subjects": [], // refer to #simple-subject
    "title": "即将上映的电影"
}
```

##### Appendices

###### Simple Subject

Refer to [Simple Celebrity](#simple-celebrity).

```json
{
    "id": "1292052",
    "title": "肖申克的救赎",
    "original_title": "The Shawshank Redemption",
    "alt": "https://movie.douban.com/subject/1292052/",
    "images": {
        "small": "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
        "large": "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
        "medium": "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg"
    },
    "rating": {
        "max": 10,
        "average": 9.7,
        "details": {
            "1": 1546.0,
            "3": 20660.0,
            "2": 1258.0,
            "5": 1335300.0,
            "4": 210663.0
        },
        "stars": "50",
        "min": 0
    },
    "mainland_pubdate": "",
    "pubdates": ["1994-09-10(多伦多电影节)", "1994-10-14(美国)"],
    "year": "1994",
    "genres": ["犯罪", "剧情"],
    "durations": ["142分钟"],
    "subtype": "movie",
    "collect_count": 2839928,
    "casts": [], // refer to #simple-celebrity
    "directors": [], // ditto
    "has_video": true,
}
```

###### Simple Celebrity

#### Book

##### Info

/v2/book/{book_id}

###### Response

```json

```

#### Appendices

##### Simple Celebrity

```json
{
    "id": "1276787",
    "name": "申·阿克",
    "name_en": "Shane Acker",
    "alt": "https://movie.douban.com/celebrity/1276787/",
    "avatars": {
        "small": "http://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg",
        "large": "http://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg",
        "medium": "http://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg"
    }
}
```
