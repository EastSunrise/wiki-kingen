#### Navicat

**Notes**: It doesn't apply to Navicat 15 or higher versions.

##### Preparation

Download and installation [Navicat 12.1.26](http://download.navicat.com.cn/download/navicat121_premium_cs_x64.exe). Get keygen and patcher from OneDrive.

##### Steps

1. Replace the public key in the *navicat.exe* and *libcc.dll* with *patcher.exe*.

	```shell
	navicat-patcher.exe 'Navicat installation path' 'RSA-2048 PEM file'
	```

	'Navicat installation path' is the full installation path of Navicat. It's **necessary**.

	'RSA-2048 PEM file' assigns the path of RSA-2048 PEM file, absolute or relative. It's optional. Current directory will be chosen by default.

	For example, `navicat-patcher.exe "D:\Devs\Navicat Premium 12"`.

2. Generate serial number with *keygen.exe*.

	```shell
	navicat-keygen.exe '-bin|-text' '-adv' 'RSA-2048 PrivateKey(PEM file)'
	```

	'-bin|-text' must be one of the values: `-bin` or `-text`. `-bin` for the old way，it will generate a license file. `-text` for the new way, it will generate a Base64 code. It's **necessary**.

	'-adv' enables advanced mode. ID number of the product will be required manually. It's optional.

	'RSA-2048 PrivateKey(PEM file)' is the file generated in step 1. It's **necessary**.

	For example, `navicat-keygen.exe -text RegPrivateKey.pem`.

	Choose the product type, user language and the version as needed. Then it will print a **serial number**, like `XXXX-XXXX-XXXX-XXXX`.

3. Generate activation code

	Input custom user name and organization name casually.

	Then comes request code: turn off the Internet connection, fill in the serial number above and choose Activation button. Generally, it will fail, then choose manual activation instead. Copy the request code from manual activation window to *keygen.exe* and press `Enter` twice.

	If everything goes well, it will generate a string of activation code like Base64 code. Copy to the activation window to finish activation.