## Navicat

**注意**：不适用于 Navicat 15 或更高的版本.

### 准备

下载并安装 [Navicat 12.1.26](http://download.navicat.com.cn/download/navicat121_premium_cs_x64.exe).

### 步骤

Replace the public key in the _navicat.exe_ and _libcc.dll_ with _patcher.exe_. For example, `navicat-patcher.exe "D:\Devs\Navicat Premium 12"`.

```shell
$ navicat-patcher.exe <Navicat installation path> [RSA-2048 PEM file]

# <Navicat installation path> is the full installation path of Navicat.
# [RSA-2048 PEM file] assigns the path of RSA-2048 PEM file, absolute or relative.
# It's optional. Current directory will be chosen by default.
```

Generate serial number with _keygen.exe_. For example, `navicat-keygen.exe -text RegPrivateKey.pem`.

```shell
$ navicat-keygen.exe <-bin|-text> [-adv] <RSA-2048 PrivateKey(PEM file)>

# <-bin|-text> must be one of the values: '-bin' or '-text'.
# '-bin' for the old way，it will generate a license file.
# '-text' for the new way, it will generate a Base64 code.
# [-adv] enables advanced mode. ID number of the product will be required manually.
# <RSA-2048 PrivateKey(PEM file)> is the file generated in step 1.
```

Choose the product type, user language and the version as needed. Then it will print a **serial number**, like `XXXX-XXXX-XXXX-XXXX`.

Input custom user name and organization name casually.

Then comes request code: turn off the Internet connection, fill in the serial number above and choose Activation button. Generally, it will fail, then choose manual activation instead. Copy the request code from manual activation window to _keygen.exe_ and press `Enter` twice.

If everything goes well, it will generate a string of activation code like Base64 code. Copy to the activation window to finish activation.
