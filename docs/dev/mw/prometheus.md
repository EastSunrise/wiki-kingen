# Prometheus

## 基本概念

### 指标 Metric

Prometheus 按时间序列（time series）存储所有指标（metrics）数据。每个时间序列由一个指标名称和一组标签组成：

- 指标名称（metric name）表明数据所度量的系统特征，格式为 `[a-zA-Z_:][a-zA-Z0-9_]*`，例如 `http_requests_total` 表示接收的 HTTP 请求总数；
- 标签（labels）定义了数据对应的不同维度，格式为 `[a-zA-Z_][a-zA-Z0-9_]*`，例如 `method="POST"` 和 `path="/api/track"`。

其记号格式如下：

```text
<metric_name>{<label_name>=<label_value>, ...}

http_requests_total{method="POST", path="/api/track"}
```

### 指标类型

Prometheus 包含四种指标类型：

- Counter：单调递增的累计指标，例如请求总数；
- Gauge：任意变化的数值指标，例如温度、内存使用率等；
- Histogram：基于基础指标的采样统计，可以分为三种类型：
    - Bucket：落入指定分组范围的基础数据个数，例如 `request_duration_seconds_bucket{le="0.1"}`；
    - Count：基础数据总数，例如 `request_duration_seconds_count`；
    - Sum：基础数据综合，例如 `request_duration_seconds_sum`；
- Summary

## 安装

[下载](https://prometheus.io/download/)并安装 Prometheus：

```sh
wget https://github.com/prometheus/prometheus/releases/download/v2.53.2/prometheus-2.53.2.linux-amd64.tar.gz
tar xvf prometheus-2.53.2.linux-amd64.tar.gz

cd prometheus-2.53.2.linux-amd64
sudo mv ./prometheus /usr/local/bin/
sudo mv ./promtool /usr/local/bin/
sudo mkdir -p /etc/prometheus
sudo mv ./prometheus.yml /etc/prometheus/
sudo mv ./consoles /etc/prometheus/
sudo mv ./console_libraries /etc/prometheus/
sudo mkdir -p /var/lib/prometheus
```

创建用户和设置权限：

```sh
sudo useradd --no-create-home --shell /bin/false prometheus
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool
sudo chown -R prometheus:prometheus /etc/prometheus
sudo chown -R prometheus:prometheus /var/lib/prometheus
```

新建 prometheus.service：

```sh
sudo vim /etc/systemd/system/prometheus.service
```

```text prometheus.service
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/var/lib/prometheus/ \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

启动 Prometheus 服务：

```sh
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
sudo systemctl status prometheus
```

访问 <http://localhost:9090>.

## Multi-target Exporter

Multi-target Exporter 一般支持两种查询方式：

1. Exporter 本身的指标查询，通常为 `/metrics`；
2. 指定目标的指标查询，例如 mongodb_exporter 支持通过 `/scrape?target=mongodb://localhost:27017` 查询目标 MongoDB 的指标。

Prometheus 则需要通过 `relabel_config` 来配置多个目标参数：

```yml
scrape_configs:
  - job_name: mongodb_exporter # mongodb_exporter itself
    metrics_path: /metrics
    static_configs:
      - targets:
          - localhost:9216

  - job_name: mongodb_instance
    metrics_path: /scrape
    static_configs:
      - targets:
          - mongodb://localhost:27017
          - mongodb://localhost:27018
    relabel_configs:
      - source_labels: [ __address__ ] # refer to the targets in static_configs
        target_label: __param_target
      - source_labels: [ __param_target ]
        target_label: instance
      - target_label: __address__
        replacement: localhost:9216 # replace with the address of the exporter
```

上述配置文件中，`relabel_configs` 将地址 `mongodb://localhost:27017/scrape` 替换为了 `http://localhost:9216/scrape?target=mongodb://localhost:27017`.

## 集成Grafana

[下载](https://grafana.com/grafana/download)并安装：

```sh
wget https://dl.grafana.com/oss/release/grafana-11.2.0-1.x86_64.rpm
sudo yum install -y grafana-11.2.0-1.x86_64.rpm
```

启动 Grafana 服务：

```sh
sudo systemctl daemon-reload
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
sudo systemctl status grafana-server
```

访问 <http://localhost:3000>，默认用户名密码：admin/admin.

## 配置

详情参考 [Configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

## Node Exporter

使用 [Node Exporter](https://prometheus.io/docs/guides/node-exporter/#installing-and-running-the-node-exporter) 监控 Linux 主机指标。

## 参考

- [Overview | Prometheus](https://prometheus.io/docs/introduction/overview/)
