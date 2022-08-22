### 基本

```shell
ffmpeg [global_options] {[input_file_options] -i input_url} ... {[output_file_options] output_url} ...

ffmpeg -i input.avi -c copy output.mp4
```

### 流类型 stream_specifier

- `v`：视频流
- `a`：音频流
- `s`：字幕流
- `d`：数据流

### 流选择

默认为**自动选择**，对每一种需要的流类型，**只会选择一个**输出，

- 视频流：最高分辨率的流；
- 音频流：最多声道的流；
- 字幕流：匹配输出类型的第一个字幕流。

可选参数**忽略**对应的流，`-<stream_specifier>n`，

- `-vn`：忽略视频流；
- `-an`：忽略音频流；
- `-sn`：忽略字幕流；
- `-dn`：忽略数据流。

自定义选择流，

```shell
-map [-]<input_file_id>[:<stream_specifier>][:<stream_index>][?]
```

其中，

- `-` 表示反向选择，即选择除对应的流外其它流，可选；
- `input_file_id` 表示所有输入（`-i`）的序号（从`0`开始），必选；
- `stream_specifier` 表示流类型；
- `stream_index` 指定一个流，可选；
- `?` 忽略流不存在的情况；

例如，

```shell
ffmpeg -i INPUT -map 0:2 OUTPUT # 选择INPUT的第三个流
ffmpeg -i a.mkv -i b.mkv -map 0:v -map -1:a:1 OUTPUT # 选择a.mkv的所有视频流和b.mkv中除了第二个音频流外的所有流
```

### 编码

```
-c[:<stream_specifier>] <codec_fmt>
-codec[:<stream_specifier>] <codec_fmt>
-[stream_specifier]codec <codec_fmt>
```

其中，

- `stream_specifier` 表示流类型；
- `codec_fmt` 表示编码格式，如需复制流使用 `copy`；

例如，

```shell
ffmpeg -i INPUT -c:v copy OUTPUT # 提取视频流
```