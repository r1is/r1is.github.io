# hexo-theme-islu
## 安装hexo框架
  `npm install hexo-cli -g`
  
## hexo主题博客源码
1. 下载源码
2. 运行`npm i`自动安装所需依赖
3. 更改个人信息及所需配置
4. 更改`_config.yml` 中 `deploy` 仓库地址为自己的仓库地址
5. 运行`hexo cl&&hexo g&&hexo d`
6. 成功！
## 备份主题
- 分支`hexo`储存的是网站的原始文件
- 分支`master`用来储存生成的静态网页

## 关于日常的改动流程
在本地对博客进行修改（添加新博文、修改样式等等）后，通过下面的流程进行管理。
1. 依次执行`git add .` 、`git commit -m "注释"`、`git push origin hexo`指令将改动推送到`GitHub`（此时当前分支应为`hexo`）；
2. 然后才执行`hexo g -d`发布网站到`master`分支上。
虽然两个过程顺序调转一般不会有问题，不过逻辑上这样的顺序是绝对没问题的（例如突然死机要重装了，悲催....的情况，调转顺序就有问题了）。
 
## 三、本地资料丢失后的流程
当重装电脑之后，或者想在其他电脑上修改博客，可以使用下列步骤：
1. 使用`git clone git@github.com:RyzeZR/RyzeZR.github.io.git`拷贝仓库（默认分支为`hexo`）；
2. 在本地新拷贝的http://RyzeZR.github.io  件夹下通过`Git bash`依次执行下列指令：`npm install hexo`、`npm install`、`npm install hexo-deployer-git`（记得，不需要`hexo init`这条指令）。

