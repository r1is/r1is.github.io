---
title: C语言文件操作
author: Ryze
img: /source/images/xxx.jpg 文章特征图
top: false
cover: true
coverImg: /images/1.jpg 首页轮播封面
toc: true
mathjax: false
summary: 摘要-这里记得改
categories: 分类-这里记得改
tags:
  - 文章标签-这里记得改
keywords: 关键词-这里记得改
essay: false
date: 2021-07-22 17:37:16
password:
---

### 文件操作
https://en.cppreference.com/w/c/io 
stdin 标准输入设备
stdout 标准输出设备
stderr 标准输出设备

在库里一切接文件

打开/创建 fopen()

#### 文本方式
> 把文件当作屏幕
参考printf()和scanf()
比如说，fprintf()、fscanf()、fgetwc()、fputws()

把文件当作屏幕

#### 二进制方式
读写数据 fread
写入数据 fwrite

#### 文件指针 
ftell告诉文件指针在哪里 
fseek移到哪里 
feof 判断结束了没有
rewind

关闭 fclcose()

文件保存 文本方式和二进制方式
文本方式ASCII码和二进制

**C标准库**
![](https://cdn.jsdelivr.net/gh/RyzeZR/blog/note-img/20210722234738.png)
---
**微软**
https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-160
![](https://cdn.jsdelivr.net/gh/RyzeZR/blog/note-img/20210722235202.png)
---

#### 示例代码
```c
char szPlayerName[32]={"划拉哒不留};
int nPlayerLevel = 20;
float fPlayerMoney = 35.5;
FILE* fd = fopen("1.txt","wb"); //二进制打开
if(fd == NULL)
{
perror("fopen");
return 0;
}
//写32次，一次写1个字节
size_t size = fwrite(szPlayerName,1,32,fd);
if(size <=0 )
{
printf("fwrite");
}else
{
printf("write file size :%d\r\n",size);
}

//移动文件指针
if(fseek(fd,16,SEEK_SET) != 0)
{
perror("feek");
fclose(fd);
return 0;
}

size = fwrite(&nPlayerLevel ,1,sizeof(nPlayerLevel ),fd);
if(size <=0 )
{
printf("fwrite");
}

fclose(fd);

二进制读文件：
FILE* fd = fopen("1.dat","wb");

文本方式：
FILE* fd = fopen("1.txt","w");

//刷新缓存
fflush(fd);


char buf[7];
FILE* fd5 = fopen("4.dat", "r+");  //文本方式打开
fseek(fd5, 0, SEEK_END);
int size = ftell(fd5);
fseek(fd5, 0, SEEK_SET);
fread(buf, 1, 7, fd5);

//r+模式写入数据会出问题
//换成rb+
//'\r' '\n'
//00 00 00 0d 00 0a 00 00
//01 02 03 0d 00 0a 00 00
//01 02 03 0d 00 0d 0a 00
buf[0] = 1;
buf[1] = 2;
buf[2] = 3;
fseek(fd5, 0, SEEK_SET);
fwrite(buf, 1, 7, fd5);
fflush(fd5);
fclose(fd5);


```