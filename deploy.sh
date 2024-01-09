#!/usr/bin/env sh
# 推送代码 sh deploy.sh (git环境)
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm --filter blog docs:build

cd ./packages/blog/docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:cognitiones/blog_theme.git master:gh-pages
# git push -f git@gitee.com:mqyqingfeng/learn-typescript.git master:gh-pages

cd -