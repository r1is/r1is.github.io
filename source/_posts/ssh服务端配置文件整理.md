---
title: ssh服务端配置文件整理
author: Ryze
img: https://pic1.zhimg.com/v2-c57bf43b7a8b9b198f63797ccf4d8982_1440w.jpg?source=172ae18b
top: false
cover: false
coverImg: https://linuxhandbook.com/content/images/2020/06/SSH-Public-Key-Authentication.png
toc: true
mathjax: false
categories: 工具
tags:
  - ssh配置文件
  - ssh远程登录时遇到的问题
keywords: Hexo
essay: false
abbrlink: 3881
date: 2021-06-27 17:27:57
password:
summary:
---

### 1. ssh远程登录配置文件说明

```bash
#	$OpenBSD: sshd_config,v 1.103 2018/04/09 20:41:22 tj Exp $

# This is the sshd server system-wide configuration file.  See
# sshd_config(5) for more information.

# This sshd was compiled with PATH=/usr/bin:/bin:/usr/sbin:/sbin

# The strategy used for options in the default sshd_config shipped with
# OpenSSH is to specify options with their default value where
# possible, but leave them commented.  Uncommented options override the
# default value.

#监听的端口
#Port 22
#家族地址，any表示同时监听ipv4和ipv6
#AddressFamily any
#监听本机所有IPv4地址
#ListenAddress 0.0.0.0
#监听本机所有IPv6地址
#ListenAddress ::

#ssh所使用的RSA私钥路径
#HostKey /etc/ssh/ssh_host_rsa_key
#HostKey /etc/ssh/ssh_host_ecdsa_key
#HostKey /etc/ssh/ssh_host_ed25519_key

# Ciphers and keying
#RekeyLimit default none

# Logging
#设定在记录来自sshd的消息的时候，是否给出“facility code
#SyslogFacility AUTH
#日志记录级别，默认为info
#LogLevel INFO

# Authentication:

#限定用户认证时间为2min
#LoginGraceTime 2m
#是否允许root账户ssh登录,生成环境使用root账号登录危害极大,自己玩玩就无所谓了
#PermitRootLogin prohibit-password
PermitRootLogin yes
#设置ssh在接收登录请求之前是否检查用户根目录和rhosts文件的权限和所有权，建议开启
#StrictModes yes
#指定每个连接最大允许的认证次数。默认值是
#MaxAuthTries 6
#最大允许保持多少个连接。默认值是 10
#MaxSessions 10

#是否开启公钥验证
#PubkeyAuthentication yes
PubkeyAuthentication yes

# Expect .ssh/authorized_keys2 to be disregarded by default in future.
#公钥验证文件路径
#AuthorizedKeysFile	.ssh/authorized_keys .ssh/authorized_keys2
AuthorizedKeysFile	.ssh/authorized_keys %h/.ssh/authorized_keys2

#AuthorizedPrincipalsFile none

#AuthorizedKeysCommand none
#AuthorizedKeysCommandUser nobody

# For this to work you will also need host keys in /etc/ssh/ssh_known_hosts
#HostbasedAuthentication no
# Change to yes if you don't trust ~/.ssh/known_hosts for
# HostbasedAuthentication
#IgnoreUserKnownHosts no
# Don't read the user's ~/.rhosts and ~/.shosts files
#IgnoreRhosts yes

# To disable tunneled clear text passwords, change to no here!

#是否允许密码验证
#PasswordAuthentication yes
PasswordAuthentication yes

#是否允许空密码登录
#PermitEmptyPasswords no

# Change to yes to enable challenge-response passwords (beware issues with
# some PAM modules and threads)

#是否允许质疑-应答(challenge-response)认证
ChallengeResponseAuthentication no

# Kerberos options
#KerberosAuthentication no
#KerberosOrLocalPasswd yes
#KerberosTicketCleanup yes
#KerberosGetAFSToken no

# GSSAPI options
#是否允许基于GSSAPI的用户认证
#GSSAPIAuthentication no
#是否在用户退出登录后自动销毁用户凭证缓存
#GSSAPICleanupCredentials yes

#GSSAPIStrictAcceptorCheck yes
#GSSAPIKeyExchange no

# Set this to 'yes' to enable PAM authentication, account processing,
# and session processing. If this is enabled, PAM authentication will
# be allowed through the ChallengeResponseAuthentication and
# PasswordAuthentication.  Depending on your PAM configuration,
# PAM authentication via ChallengeResponseAuthentication may bypass
# the setting of "PermitRootLogin without-password".
# If you just want the PAM account and session checks to run without
# PAM authentication, then enable this but set PasswordAuthentication
# and ChallengeResponseAuthentication to 'no'.

#是否通过PAM验证
UsePAM yes

#AllowAgentForwarding yes
#AllowTcpForwarding yes
#是否允许远程主机连接本地的转发端口
#GatewayPorts no
#是否允许X11转发
X11Forwarding yes
#X11DisplayOffset 10
#X11UseLocalhost yes
#PermitTTY yes
#是否在每一次交互式登录时打印 /etc/motd 文件的内
PrintMotd yes
#PrintLastLog yes
PrintLastLog yes
#TCPKeepAlive yes
#PermitUserEnvironment no
#Compression delayed
#ClientAliveInterval 0
#ClientAliveCountMax 3
#UseDNS no
#PidFile /var/run/sshd.pid
#MaxStartups 10:30:100
#PermitTunnel no
#ChrootDirectory none
#VersionAddendum none

# no default banner path
#Banner none

# Allow client to pass locale environment variables
AcceptEnv LANG LC_*

# override default of no subsystems
Subsystem	sftp	/usr/lib/openssh/sftp-server

# Example of overriding settings on a per-user basis
#Match User anoncvs
#	X11Forwarding no
#	AllowTcpForwarding no
#	PermitTTY no
#	ForceCommand cvs server
```

### 2. 普通用户使用密钥登录时出现的问题

#### 1. 普通用户家目录下 ./ssh/authorized_keys 权限配置不对

![](https://blog.ryzezr.com/usr/uploads/2021/05/580441958.png)

此时`drcom`用户的` authorized_keys`文件是 `600`权限，虽然已经正确配置了密钥，但是登录时依然需要drcom用户提供密码

修改 `/home/drcom/.ssh/authorized_keys `的权限为 `644`

```bash
chmod 644 authorized_keys
```

![](https://blog.ryzezr.com/usr/uploads/2021/05/3676596635.png)

修改完权限后，drcom能通过密钥正常登录

### 参考

1. [普通用户 ssh 密钥登录失败的问题，困惑了很久](https://segmentfault.com/q/1010000000613569)
