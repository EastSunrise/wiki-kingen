# Redis

[Redis](https://redis.io/) 是一个开源的基于内存的数据库，可用作缓存，消息代理等。

## 安装

参考 [Install Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/).

## 命令

参考 [Commands](https://redis.io/docs/latest/commands/).

## 主从复制

Redis 支持主从复制，机制如下：

1. 当主从节点都正常时，主节点不断向从节点发送生效的命令，以保持数据一致性（异步复制，并按数据量 ACK 确认）；
2. 当主从节点断开连接时，从节点会重连，并尝试再同步，即读取断连期间的命令，并执行；
3. 如果再同步无法执行，从节点会向主节点请求一次全同步，主节点需要创建一个数据快照，并发送给从节点

Redis 主从复制既实现了数据备份，提高了数据安全性，又实现了读写分离，提高了系统处理能力。

## 哨兵模式

Redis 哨兵模式提供了非集群模式下的高可用方案，依赖于 Redis 主从复制。主从复制通过数据同步确保主节点故障时，系统仍能正常运行。哨兵则负责监控主从节点，并在故障时自动故障转移。

1. 监控：Redis 哨兵通过心跳机制持续监控主从节点是否正常工作；
2. 通知：一旦某个节点出现故障，哨兵可以通过 API 通知系统管理员或其它程序；
3. 自动故障转移：如果主节点无法工作，哨兵将启动故障转移，选举一个从节点成为新的主节点（至少半数哨兵同意），配置其它从节点指向新的主节点，并通知客户端重定向到新的主节点；
4. 配置服务器：在客户端连接或故障转移时，哨兵通过 Pub/Sub 机制发布主节点信息。

哨兵模式下，通常会部署多个哨兵实例，以确保正常工作。

## 集群模式

TODO

## 持久化

TODO

## 参考

- [Redis Docs](https://redis.io/docs/latest/)
- [Redis Community Edition and Stack | Docs](https://redis.io/docs/latest/operate/oss_and_stack/)
