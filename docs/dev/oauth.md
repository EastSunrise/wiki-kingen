#### Overview

[OAuth](https://oauth.net/) is an open standard for access delegation, commonly used as a way for Internet users to **grant** websites or applications access to their information on other websites but without giving them the passwords. This is based on [OAuth 2.0](https://oauth.net/2/).

#### Roles

- **User** the owner of the resources
- **Client** the third application
- **Authorization Server** server to grant authorization
- **Resource Server** server to get resources

![Roles](\img\OAuth_roles.jpg)

#### Authorization Mode

![Steps](\img\OAuth_steps.jpg)

- Client requests authorization from User. 
- Authorization Server sends an **authorization code** to Client if User agreed.
- Client requests tokens from Authorization Server with the authorization code.
- Authorization Server returns an **access token** after confirming authorization.
- Client requests resources from Resource Server with the access token.
- Resource Server returns resources after verifying the token.

Generally, an authorization code will expire in 10min and could be used only once. If an code is applied more than once, hijacked by an hacker for example, the access token verified by the code will turn invalid.

As for an access token, valid time is 2h. 

#### References

1. [OAuth - Wikipedia](https://en.wikipedia.org/wiki/OAuth)
2. [理解OAuth 2.0 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)