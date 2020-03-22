#### Overview

Fiddler works as a proxy server. Fiddler will logout when exiting. However, **network anomaly will happen if Fiddler exits abnormally**. In that case, just restart Fiddler and close again. This is based on [Fiddler 4](https://www.telerik.com/fiddler).

#### Configuration

##### PC

1. Open Fiddler，choose the path: *Tools -> Options -> HTTPS*
2. Check "Decrypt HTTPS traffic", and then requests of 'HTTPS' will be intercept.
3. (Optional) Check "Ignore server certificate errors (unsafe)" if it's warned that the certificate of the website is untrusted.
4. Choose path: *Actions -> Trust Root Certificate*, and then install the certificate.

##### Mobile

1. Choose path:* Tools -> Options -> Connections*, modify the default port if needed.
2. Check "Allow remote computers to connect" to allow remote connections.
3. (Optional) Check "Act as system proxy on startup".
3. Keep the mobile under the same LAN with PC.
4. Use the mobile to access the address: PC-IP: port, then download and install the certificate of Fiddle.
5. Configure the proxy server of WiFi of the mobile.

#### References

1. [fiddler配置及使用教程 - 博客园](https://www.cnblogs.com/woaixuexi9999/p/9247705.html)