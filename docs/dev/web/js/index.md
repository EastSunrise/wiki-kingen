# JavaScript

## 请求

### fetch

```js
// fetch with promise
fetch("/api/test", { method: "GET" })
  .then((response) => {
    console.log("Connected");
    return response.json();
  })
  .then((data) => {
    console.log("Data received.");
    // do something with data
  })
  .catch((error) => {
    console.log("Error: " + error);
  });

// fetch with async/await
fetchAsync = async () => {
  try {
    const response = await fetch("/api/test", { method: "GET" });
    if (!response.ok) {
      console.log("HTTP error! status: " + response.status);
    } else {
      const data = await response.json();
      console.log("Data received.");
      // do something with data
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};
```

## 参考

- [JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
