# FFmpeg

## 基本

```shell
ffmpeg [global_options] {[input_file_options] -i input_url} ... {[output_file_options] output_url} ...

ffmpeg -i input.avi -c copy output.mp4
```

`-i` 选项前后分别是 _input_ 和 _ouput_ 选项.

## 流类型 stream_specifier

- `v`：视频流
- `a`：音频流
- `s`：字幕流
- `d`：数据流

## 流选择

默认为**自动选择**，对每一种需要的流类型，**只会选择一个**输出，

- 视频流：最高分辨率的流；
- 音频流：最多声道的流；
- 字幕流：匹配输出类型的第一个字幕流。

可选参数**忽略**对应的流，`-<stream_specifier>n`，

- `-vn` 忽略视频流；
- `-an` 忽略音频流；
- `-sn` 忽略字幕流；
- `-dn` 忽略数据流。

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

## 编码

```txt
-c[:<stream_specifier>] <codec_fmt>
-codec[:<stream_specifier>] <codec_fmt>
-[stream_specifier]codec <codec_fmt>

# 比特率
-b:[stream_specifier] <bitrate>
```

其中，

- `stream_specifier` 表示流类型，v=视频流，a=音频流，s=字幕流；
- `codec_fmt` 表示编码格式，如需复制流使用 `copy`；

例如，

```shell
ffmpeg -i INPUT -c:v copy OUTPUT # 提取视频流
ffmpeg -i INPUT -c:v libx264 -b:v 1M OUTPUT # 使用h.264编码
ffmpeg -i INPUT -c:v h264_nvenc -b:v 1M OUTPUT # 使用h.264编码，同时使用GPU加速
```

### 视频编码

CRF（Constant Rate Factor）是控制视频编码的一种常用方式，决定了编码文件的大小和视频的质量。

CRF 的取值范围是 0-51（指数），其中，0 代表无损，23 是默认值，51 代表质量最差。一般正常取值在 17-28.

```sh
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a copy output.mp4
```

## 片段

```shell
-ss <position> # 开始时间
-to <position> # 截止时间
-t <duration> # 时长
```

其中，

- `position` 格式为 `[-][HH:]MM:SS[.m...]`；
- `duration` 格式为 `[-]S+[.m...][s|ms|us]`，`us` 表示微秒。

例如，

```shell
ffmpeg -ss 02:30 -to 10:20 -i INPUT.mp4 -c copy OUTPUT.mp4
```

## 拼接

```txt title="videos.txt"
file '1.mp4'
file '2.mp4'
```

```sh
ffmpeg -f concat -i videos.txt -c copy output.mp4
```

## 偏移

```sh
# 添加偏移量
-itsoffset <offset>

# 字幕增加5秒
ffmpeg -itsoffset 5 -i subtitle.srt -c copy subtitle_delayed.srt
```

## 裁剪和填充

```sh
# 裁剪
ffmpeg -i input.mp4 -vf "crop=out_w:out_h:x:y" output.mp4
```

其中，`out_w` 和 `out_h` 对应输出视频的宽和高，`x:y` 对应输出视频左上角在输入视频中的坐标。

```sh
# 填充
ffmpeg -i input.mp4 -vf "pad=out_w:out_h:x:y" output.mp4
```

其中，`out_w` 和 `out_h` 对应输出视频的宽和高，`x:y` 对应输入视频左上角在输出视频中的坐标。

## 参考

- [ffmpeg Documentation](https://ffmpeg.org/ffmpeg.html)
