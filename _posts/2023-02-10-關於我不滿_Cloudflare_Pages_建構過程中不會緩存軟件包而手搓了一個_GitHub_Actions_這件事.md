---
title: "關於我不滿 Cloudflare Pages 建構過程中不會緩存軟件包而手搓了一個 GitHub Actions 這件事"
date: 2023-02-10T11:10:27+08:00
author: 可愛EMO醬！
# about:
lang: zh-TW
# permalink: /justo-imperdiet-condimentum-ad-cum-acanone/
categories: 技術
tags: [技術]
---
以前使用 Jekyll + CF Pages 建構網站至少五分鐘，現在一分鐘不到，真好啊（笑）

## 建立 Cloudflare Pages Project
1. 在 Dashboard > Pages 裏面，選擇 Create a project > Direct Upload
2. 填寫 Project 的名稱（等於下面的 `cloudflare_project_name`）
3. 填寫完成後，Cloudflare 會提示你上載檔案，**不要上載**，直接返回 Pages 頁面即可
4. 如果一切順利，會見到一個空 Project，此時可以運行 GitHub Actions

## GitHub Actions 配置
主要的 Code 在 [`1f616neko/actions-cfpage-deploy`](https://github.com/1f616neko/actions-cfpage-deploy) 裏面，在 Workflow 裏面使用配置如下：

```yaml
- name: Deploy to Cloudflare Pages
  id: deployment
  uses: 1f616neko/actions-cfpage-deploy@main
  with:
    cloudflare_api_token: ${{ secrets.CLOUDFLARE_API_TOKEN_PAGES }}
    cloudflare_account_id: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    cloudflare_project_name: '1f616emo-blog'
    branch: 'main'
    path: './_site'
```

* `cloudflare_api_token` 是在 [CF Dashboard](https://dash.cloudflare.com/profile/api-tokens) 獲得的 API Token，必須具有對 Pages 的寫權限，建議以 [Action Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) 的方式儲存
* `cloudflare_account_id` 是存取 Dashboard 的時候 `https://dash.cloudflare.com/` 之後的一串亂碼
* `cloudflare_project_name` 是 Project 的名稱，和在 Dashboard > Pages 上看到的是同一個
* `branch` 是需要被建構的 Git Branch 名稱
* `path` 是儲存需要被提交的檔案的資料夾，也就是建構程序的輸出
  * 如果是 Jekyll，預設是 `./_site`
  * 如果是靜態網頁，使用 `.` 即可

可以參考 [`1f616neko/blog` 的 Workflow](https://github.com/1f616neko/blog/blob/main/.github/workflows/cf-pages-jekyll.yml) 進行配置。

## 結果
在切換建構平臺後，得益於 GitHub 的緩存機制，建構速度大大提高；反觀 Cloudflare Page 內建的 GitHub 綁定建構，由於沒有緩存，速度十分緩慢。第一次構建或許沒有太大分別（因爲同樣需要下載軟件包），但是後續的建構則可以看出十分明顯的分別。



