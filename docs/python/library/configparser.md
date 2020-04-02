#### Get Started

Following is an example of [*.ini* file](#.ini-file):

```
[DEFAULT]
ServerAliveInterval = 45
Compression = yes
CompressionLevel = 9
ForwardX11 = yes

[bitbucket.org]
User = hg

[topsecret.server.com]
Port = 50022
ForwardX11 = no
```

Create and save a configuration file above by *ConfigParser*. It's treated much like a dictionary. 

```python
import configparser
config = configparser.ConfigParser()

# write
config['DEFAULT'] = {
    'ServerAliveInterval': '45',
    'Compression': 'yes',
    'CompressionLevel': '9'
}
config['bitbucket.org'] = {}
config['bitbucket.org']['User'] = 'hg'
config['topsecret.server.com'] = {}
topsecret = config['topsecret.server.com']
topsecret['Port'] = '50022'     # mutates the parser
topsecret['ForwardX11'] = 'no'  # same here
config['DEFAULT']['ForwardX11'] = 'yes'

with open('example.ini', 'w') as configfile:
    config.write(configfile)
```

Then read it back.

```python
import configparser

config = configparser.ConfigParser()

config.sections() # []

config.read('example.ini')
config.sections() # ['bitbucket.org', 'topsecret.server.com']
print('bitbucket.org' in config) # True
user = config['bitbucket.org']['User'] # 'hg'
compression = config['DEFAULT']['Compression'] # 'yes'
topsecret = config['topsecret.server.com']
for key in config['bitbucket.org']:  
    print(key)
# user
# compressionlevel
# serveraliveinterval
# compression
# forwardx11
```

**Notes**: all values in the configuration file are stored as strings. Convert types with given getter methods or customized methods.

```python
import configparser

config = configparser.ConfigParser()
config['DEFAULT'].getint('ServerAliveInterval') # 45
```

#### .INI File

A configuration file consists of sections, each led by a `[section]` header, followed by key/value entries separated by a specific string ('=' or ':').

ConfigParser supports interpolation. This means values can be preprocessed before returning them from `get()` calls.

```python
from configparser import ConfigParser, BasicInterpolation

config = ConfigParser(interpolation=BasicInterpolation)
```

**BasicInterpolation** enables values to contain format strings which refer to other values in the same section, or values in the special default section.

```
[Paths]
home_dir: /Users
my_dir: %(home_dir)s/lumberjack
my_pictures: %(my_dir)s/Pictures

[Escape]
gain: 80%%  # use a %% to escape the % sign (% is the only character that needs to be escaped)
```

**ExtendedInterpolation** uses `${section:option}` to denote a value from a foreign section. If the `section:` part is omitted, interpolation defaults to the current section (and possibly the default values from the special section).

```
[Common]
home_dir: /Users
library_dir: /Library
system_dir: /System
macports_dir: /opt/local

[Frameworks]
Python: 3.2
path: ${Common:system_dir}/Library/Frameworks/
```