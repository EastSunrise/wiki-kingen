# MongoDB

## FAQ

### MongoCursorNotFoundException

假设 MongoDB 集群有多个节点且使用负载均衡来处理数据请求，当客户端请求超过 `batchSize` 的数据时，需要分多次请求，第一次请求的 MongoDB 节点会创建游标（cursor），记录下次请求的位置，但是负载均衡器可能将下一个请求分配到其他节点，导致这个异常。

解决方案是使用 MongoDB 驱动本身实现负载均衡：

```txt
# 游标异常
mongodb://load.balance.host:27017/mydb

# 解决方案
mongodb://10.0.0.1:27017,10.0.0.2:27017,10.0.0.3:27017/mydb
```

## 参考

- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
