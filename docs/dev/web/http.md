# HTTP

超文本传输协议（HTTP）是一个用于传输超媒体文档的应用层协议。HTTP 是无状态协议，意味着服务器不会在两个请求之间保留任何数据（状态）。

## HTTP 请求方法

### HEAD

HTTP `HEAD` 方法请求资源的标头信息，并且这些标头与 HTTP `GET` 方法请求时返回的一致。该请求方法的一个使用场景是在下载一个大文件前先通过 `HEAD` 请求读取其 `Content-Length` 标头的值获取文件的大小，而无需实际下载文件，以此可以节约带宽资源。

### OPTIONS

HTTP `OPTIONS` 方法请求给定的 URL 或服务器的允许通信选项。客户端可以用这个方法指定一个 URL，或者用 `*` 来指代整个服务器。

```bash
curl -X OPTIONS https://example.org -i
```

响应包含 `Allow` 标头，其值表明了服务器支持的所有 HTTP 方法：

```http
HTTP/1.1 200 OK
Allow: OPTIONS, GET, HEAD, POST
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Mon, 08 Apr 2024 02:02:29 GMT
Expires: Mon, 15 Apr 2024 02:02:29 GMT
Server: EOS (vny/044F)
```

## 参考·

- [HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP)
