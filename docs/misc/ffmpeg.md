### 命令

- 提取字幕：`ffmpeg -i input.mkv -map 0:s:<字幕流序号> output.<srt|ass>`
- 添加字幕：`ffmpeg -i input.mkv -i <字幕文件> -codec copy output.mkv`