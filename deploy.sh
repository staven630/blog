#!/usr/bin/env sh

set -e

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:staven630/blog.git master

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:staven630/blog.git master:gh-pages