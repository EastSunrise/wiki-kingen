#### Overview

[Redis](https://redis.io/) is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.

#### Installation

##### Linux

Install Redis with `yum install redis` or from source code as follows:

1. Download Redis [here](https://redis.io/download). 
2. [Upload](linux.md#upload-and-download) to the VM.
3. Unzip the file: `tar –zxvf redis-x.x.x.tar.gz`
4. Open the unzipped directory and compile Redis with `make`, *.c* files compiled to *.o* files. Install *gcc* with `yum install gcc-c++` if *gcc* is unavailable.
5. Install Redis to target directory with `make install PREFIX=/usr/local/redis`. Several executable files are available now under the target directory, such as *redis-cli*, *redis-server*.
6. Copy *redis.conf* to the installation directory. Modify relative configurations if necessary.
7. Execute *redis-server* directly to start Redis server in the front. Then execute *redis-cli* to connect to the server.
8. Configure `daemonize yes` in the *redis.conf* and start the server with the specified configuration file, so the server can run in the background.

Start Redis at startup with `systemctl enable redis`.

##### Windows

The Microsoft Open Tech group instead of the official offer [Redis for Windows](https://github.com/microsoftarchive/redis/releases). Follow the instructions to install Redis and then set Redis as Windows service with `redis-server --service-install [redis.windows-service.conf] --service-name [redis] --port [6380]`. Set different configuration files, service names and ports for different instances of Redis.

**Notes**

- Modify `bind 127.0.0.1`, otherwise the server can't be accessed to except localhost.
- Open the port with `firewall-cmd --zone=public --add-port=6379 -permanent` on Linux when remote connection is refused because firewall of the server is enabled.
- Connecting through *SSH* is an option. In this case, `AllowTcpForwarding yes` is required to set in the */etc/ssh/sshd_config*.

#### Configuration

Configure options in the *redis.conf* file.

- bind [host1] [host2]
- requirepass [password]
