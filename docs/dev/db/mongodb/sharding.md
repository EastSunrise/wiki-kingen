# Sharding

## 分片集群

MongoDB 在集合层面进行分片，集群包含三个部分：

- 分片：集群中的数据分片，必须部署为 ReplicaSet；
- `mongos`：作为查询路由，负责将客户端请求路由到分片集群，支持 Hedged Reads；
- 配置服务器：存储集群的元数据和配置信息，也必须部署为 ReplicaSet（CSRS）。

MongoDB 支持 Hash 和 Range 两种分片策略。

## 片键

MongoDB 通过片键对数据进行分配，片键包括一个或多个文档字段。MongoDB 将片键值划分为不重叠的区间，每个区间对应一个数据块（Chunk），然后尽可能将数据块平均分配到各个分片上。

```js
sh.shardCollection(<namespace>, <key>)
// namespace: "<database>.<collection>"
// <key>: { <shard key field1>: <1|"hashed">, ... }
```

从 5.0 版本开始，MongoDB 支持修改片键以对集合重新分片。

!!! note
    如果文档中不存在片键字段，则该字段视同 `null`。

### 选择片键

片键的**基数**（cardinality）决定了平衡器（balancer）可以创建的数据块的最大数量。每一个唯一的片键值只能分配到一个数据块上，如果一个片键有 $N$ 个值，那就只能有 $N$ 个数据块，因此也只能有 $N$ 个分片。片键的基数越小，数据块则越少，随着文档变多，单个数据库会越来越大，且无法分割，导致难以维护。例如，以“大洲”作为片键，最后至多有 7 个数据块。

如果需要使用小基数的字段进行大量查询，可以使用组合片键，且其余字段有比较多的可能值。

如果部分片键值的**频次**（frequency）过高，也会导致所在的数据块越来越大，且无法分割。最好通过组合片键降低频次。

如果基于**升序排列**的字段创建片键，例如时间和 `ObjectId`，那么每次新数据的插入都会落到最后一个数据块上，导致其变成了一个单一且不可分散的热点，压力容易过大。此时可以考虑 Hash 分片。

### 片键和索引

分片的集合必须建立片键索引或者以片键为前缀的联合索引。如果分片时集合为空且不存在合适的索引，MongoDB 会自动创建基于片键的索引。如果集合不为空，则必须预先创建合适的索引。

分片的集合只能建立如下的唯一性索引：

1. 以片键为索引
2. 以片键为前缀的联合索引
3. 默认的 `_id`

## 部署

参考 [Deploy a Self-Managed Sharded Cluster](https://www.mongodb.com/docs/manual/tutorial/deploy-shard-cluster/)

## 数据划分

当对一个空集合分片时，MongoDB 先创建一个数据块，覆盖整个片键区间（range）。随着数据的插入，MongoDB 会将数据块进行拆分，并将数据块平均分配到各个分片上。

数据块的默认大小是 128MB，可以通过命令修改 `chunkSize`。

## 平衡器

MongoDB 的平衡器（balancer）负责将数据块平均分配到各个分片上。对于单个集合，只有两个分片的数据大小差距超过 3 倍数据块大小（默认为 384MB）时，平衡器才会将数据块重新分配。

MongoDB 做了以下优化，以减少平衡器对性能的影响：

1. MongoDB 支持并发的数据迁移，但一个分片同时只能执行一个迁移操作；
2. 只有数据最多和最少的分片间大小差距超过上述限制，平衡器才会执行迁移操作；
3. MongoDB 允许配置平衡器的运行时段（`sh.setBalancerWindow()`），以避开高峰期；
4. 临时关闭平衡器（`sh.stopBalancer()`）

!!! note
    在 6.0 版本之前，当数据块大小超过 `chunkSize` 时，MongoDB 就会将该数据块分割。但是自 6.0 版本起，只有当需要跨分片迁移数据块时，即分片间的数据大小超过 3 倍 `chunkSize` 时，MongoDB 才会分割数据块。

## 参考

- [Sharding - MongoDB Manual v7.0](https://www.mongodb.com/docs/manual/sharding/)