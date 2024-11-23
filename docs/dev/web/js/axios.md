# Axios

## 基本用例

```js
// GET
const query = { id: 12345 };
axios
  .get("/user", { params: query })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

// POST
const data = { username: "admin", password: "123456" };
axios
  .post("/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

// async/await
async function getUser() {
  try {
    const response = await axios.get("/user", { params: query });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

请求的响应结构如下：

```json
{
  // `data` is the response that was provided by the server
  "data": {},

  // `status` is the HTTP status code from the server response
  "status": 200,

  // `statusText` is the HTTP status message from the server response
  "statusText": "OK",

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  "headers": {},

  // `config` is the config that was provided to `axios` for the request
  "config": {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  "request": {}
}
```

## 默认配置

```js
// global config
axios.defaults.baseURL = "https://api.example.com";

// custom instance config
const instance = axios.create({
  baseURL: "https://api.example.com",
});
instance.get("/user", { params: query });
```

## 拦截器

```js
// interceptors for request
axios.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  }
);

// interceptors for responses
axios.interceptors.response.use(
  (response) => {
    // do something when status = 2xx
    return response;
  },
  function (error) {
    // do something when status != 2xx
    return Promise.reject(error);
  }
);
```

## 参考

- [Axios API | Axios Docs](https://axios-http.com/zh/docs/api_intro)
