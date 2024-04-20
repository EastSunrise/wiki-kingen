# InfluxDB

本文基于 InfluxDB OSS 2.7.6.

## 安装和配置

在 Linux 上下载和安装 InfluxDB 和 influx 客户端：

```sh
# InfluxDB for Ubuntu/Debian AMD64
curl -O https://dl.influxdata.com/influxdb/releases/influxdb2_2.7.6-1_amd64.deb
sudo dpkg -i influxdb2_2.7.6-1_amd64.deb

# start influxdb
sudo systemctl start influxdb

# Influx CLI for amd64
wget https://dl.influxdata.com/influxdb/releases/influxdb2-client-2.7.3-linux-amd64.tar.gz
tar xvzf ./influxdb2-client-2.7.3-linux-amd64.tar.gz
```

使用 influx 客户端初始化 InfluxDB：

```sh
# setup
./influx setup -u username -p password  -o org_name -b bucket -r 0 -n name -f

# show auth including generated token
./influx auth list
```

在浏览器中访问 <http://localhost:8086> 使用设置的用户和密码登录 InfluxDB 控制台。

## API

InfluxDB 通过 `Authorization: Token YOUR_API_TOKEN` 请求头认证 API 请求，

```sh
# list buckets including system buckets
curl --request GET "http://localhost:8086/api/v2/buckets" \
  --header "Authorization: Token ${INFLUX_TOKEN}"
```

完整的 API 列表参考：<https://docs.influxdata.com/influxdb/v2/api/>.

### Java Library

使用官方的 [influxdb-client-java](https://github.com/influxdata/influxdb-client-java) 和 Flux 数据脚本语言访问 InfluxDB.

```xml title="pom.xml"
<dependencies>
    <dependency>
        <groupId>com.influxdb</groupId>
        <artifactId>influxdb-client-java</artifactId>
        <version>6.10.0</version>
    </dependency>

    <dependency>
        <groupId>com.influxdb</groupId>
        <artifactId>flux-dsl</artifactId>
        <version>6.10.0</version>
    </dependency>
</dependencies>
```

在 classpath 下添加 *influx2.properties* 配置 InfluxDB 连接参数：

```properties title="influx2.properties
url=http://localhost:8086
org=YOUR_ORG
bucket=YOUR_BUCKET
token=YOUR_API_TOKEN
```

通过异步的 HTTP API 读写数据：

```java title="InfluxdbTemplate.java"
public class InfluxdbTemplate {

    private static final String MEASUREMENT_NAME = "example";

    private final String bucket;
    private final WriteApi writeApi;
    private final QueryApi queryApi;

    public InfluxdbTemplate() {
        InfluxDBClientOptions options = InfluxDBClientOptions.builder().loadProperties().build();
        InfluxDBClient client = InfluxDBClientFactory.create(options).enableGzip();
        this.bucket = options.getBucket();
        this.writeApi = client.makeWriteApi();
        this.queryApi = client.getQueryApi();
    }

    public void WriteData(Instant time, String tag, double value) {
        Point point = Point.measurement(MEASUREMENT_NAME)
            .addTag("tag", tag)
            .addField("value", value)
            .time(time, WritePrecision.MS);
        writeApi.writePoint(point);
    }

    public void queryData(Instant start, Instant stop) {
        Flux flux = Flux.from(bucket)
            .range(start, stop)
            .filter(Restrictions.measurement().equal(MEASUREMENT_NAME));
        List<FluxTable> tables = queryApi.query(flux.toString());
        for (FluxTable table : tables) {
            table.getRecords().forEach(System.out::println);
        }
    }
}
```

## 参考

- [InfluxDB OSS v2 Documentation](https://docs.influxdata.com/influxdb/v2/)
- [Flux Documentation](https://docs.influxdata.com/flux/v0/)
