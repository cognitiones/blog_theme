# Docker

## dockerfile 指令

- FROM：基于一个基础镜像来修改
- WORKDIR：指定当前工作目录
- COPY：把容器外的内容复制到容器内
- EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080
- RUN：在容器内执行命令
- CMD：容器启动的时候执行的命令

## dockerfile 命令行参数

- `-f`  参数后面通常跟着要使用的Dockerfile的路径 例如

  ```bash
  docker build -f /path/to/Dockerfile -t image_name .
  ```

- `-t`  参数允许您为您的镜像指定一个标签。例如，如果您想为您的镜像指定一个名为`my_image`的标签，您可以这样做：

  ```bash
  docker build -f /path/to/Dockerfile -t my_image .
  ```

- `--build-arg`  设置构建时的环境变量。

