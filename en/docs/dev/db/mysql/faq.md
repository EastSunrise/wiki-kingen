#### NonTransientConnectionException

**E**: NonTransientConnectionException: Public Key Retrieval is not allowed

**S**: Add **allowPublicKeyRetrieval=true** after the connection URL. Refer to [MySQL Connection String for C# .NET Core Programs - MySqlConnector](https://mysqlconnector.net/connection-options/).

#### Forget Password

On Linux, append `skip-grant-tables` to configuration file */etc/my.cnf* to enable logging in without verification. Then log in the database and execute an update sql: `update user set authentication_string = password('<new password>') where user = 'root'`. Recover the file and restart MySQL.

On Windows, the configuration file is usuallt located to *my.ini* under ProgramData.
