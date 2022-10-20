### 保存文章

/api/article/save

入参

~~~
{
    type: 1, // 1 提问 2 文章 3 公告
    title: '', // 标题
    content: '', // 内容
}
~~~

出参

~~~
{
    code: 200,
    data: '保存成功',
    '',
    ''
}
~~~

### 文章详情

/api/article/detail

入参

~~~
{
    id: 1
}
~~~

出参

~~~
{
    "code": 200,
    "data": {
        "id": 1,
        "flow": 19, // 浏览数
        "type": 1, 1 提问 2 文章 3 公告
        "title": "8883好", // 标题
        "content": "<p>3</p>", // 内容
        "auth": "1111", // 作者
        "comment_num": 0, // 评论数
        "fabulous_num": 2, // 点赞数
        "created_at": "2022-10-10T07:16:27.000Z",
        "updated_at": "2022-10-16T05:15:14.000Z",
        "is_fabulous": 2, // 1 未点赞 2点赞
        "commentList": [
            {
                "id": 1,
                "comment_id": 0,
                "article_id": 1,
                "avatar": "",
                "auth": "xiaolin",
                "user_id": 1,
                "text": "1",
                "is_del": 1,
                "created_at": "2022-10-11T12:10:53.000Z",
                "updated_at": "2022-10-11T12:10:53.000Z"
            }
        ]
    },
    "msg": "",
    "errorCode": ""
}
~~~

### 文章列表

/api/article/list

入参

~~~
{
    type: 1, // 1 提问 2 文章 3 公告
    page: 1,
    pageSize: 30,
    title: "",
    is_topping: false, // 是否按照置顶排序
    is_flow: false, // 是否按照浏览量排序
    is_create_sort: false, // 是否按照创建时间排序
}
~~~

出参

~~~
{
    "code": 200,
    "data": {
        "activeData": [
            {
                "id": 1,
                "user_id": 1,
                "type": 1,
                "title": "8883好",
                "content": "<p>3</p>",
                "auth": "1111",
                "flow": 20,
                "comment_num": 0,
                "fabulous_num": 2,
                "is_topping": 1,
                "is_boutique": 2,
                "is_del": 1,
                "created_at": "2022-10-10T07:16:27.000Z",
                "updated_at": "2022-10-16T05:15:14.000Z"
            }
        ],
        "count": 6
    },
    "msg": "",
    "errorCode": ""
}
~~~


### 公告

/api/notice/list

入参

~~~
{
    pageSize: 30,
}
~~~

出参

~~~
{
    "code": 200,
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "type": 1,
            "title": "8883好",
            "content": "<p>3</p>",
            "auth": "1111",
            "flow": 20,
            "comment_num": 0,
            "fabulous_num": 2,
            "is_topping": 1,
            "is_boutique": 2,
            "is_del": 1,
            "created_at": "2022-10-10T07:16:27.000Z",
            "updated_at": "2022-10-16T05:15:14.000Z"
        }
    ],
    "msg": "",
    "errorCode": ""
}
~~~

### 用户点赞

/api/fabulous/save

入参

~~~
{
    is_fabulous: 1, // 1 删除点赞 2 点赞
    article_id: 1,
}
~~~

出参

~~~
{
    code: 200,
    true,
    '',
    ''
}
~~~

### 用户评论

/api/comment/save

入参

~~~
{
    text: 1,
    article_id: 1,
}
~~~

出参

~~~
{
    code: 200,
    data: '保存成功',
    '',
    ''
}
~~~

### 用户评论删除

/api/comment/del

入参

~~~
{
    id: 1 // 评论id
}
~~~

出参

~~~
{
    code: 200,
    data: true,
    '',
    ''
}
~~~

### 用户成就

/api/user/achievement

入参

~~~
{
    
}
~~~

出参

~~~
{
    code: 200,
    data: {
        questionCount: 1, // 问题总数
        activeCount: 1, // 文章总数
        totalComment: 1, // 评论总数
        totalFabulous: 1, // 点赞总数
        totalFlow: 1 // 浏览量总数
    },
    '',
    ''
}
~~~


### 用户文章/提问列表

/api/user/article/list

入参

~~~
{
    page: 1,
    pageSize: 30,
    is_create_sort: false, // 是否按照创建时间排序
    type: 1, // 1 提问 2 文章 3 公告
}
~~~

出参

~~~
{
    "code": 200,
    "data": {
        "activeData": [
            {
                "id": 1,
                "user_id": 1,
                "type": 1,
                "title": "8883好",
                "content": "<p>3</p>",
                "auth": "1111",
                "flow": 20,
                "comment_num": 0,
                "fabulous_num": 2,
                "is_topping": 1,
                "is_boutique": 2,
                "is_del": 1,
                "created_at": "2022-10-10T07:16:27.000Z",
                "updated_at": "2022-10-16T05:15:14.000Z"
            }
        ],
        "count": 6
    },
    "msg": "",
    "errorCode": ""
}
~~~

### 用户评论/回复

/api/user/comment/list

入参

~~~
{
    page: 1,
    pageSize: 30,
    article_type: 1, // 1 回复列表 2 评论列表 
}
~~~

出参

~~~
{
    "code": 200,
    "data": {
        "commentList": [
            {
                "id": 1,
                "text": 1,
                "auth": '昵称',
                "avatar": '头像',
                "is_del": 1,
                "created_at": "2022-10-10T07:16:27.000Z",
                "updated_at": "2022-10-16T05:15:14.000Z"
            }
        ],
        "count": 6
    },
    "msg": "",
    "errorCode": ""
}
~~~