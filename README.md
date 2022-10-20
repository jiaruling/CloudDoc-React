# 云文档

## 环境配置

```shell
# 安装 react 项目
$ npx create-react-app cloud-doc
# 进入项目
$ cd cloud-doc
# 安装 electron
$ npm install electron --save-dev
# 安装 electron-is-dev
$ npm install electron-is-dev --save-dev
# 安装 concurrently: https://www.npmjs.com/package/concurrently
$ npm install concurrently --save-dev
# 安装 wait-on: https://www.npmjs.com/package/wait-on
$ npm install wait-on --save-dev
# 安装 cross-env https://www.npmjs.com/package/cross-env
$ npm install --save-dev cross-env
# 安装样式库 https://getbootstrap.com/
$ npm install bootstrap --save
# 安装图标库 https://fontawesome.com/v6/docs/web/use-with/react/
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/free-brands-svg-icons
$ npm i --save @fortawesome/react-fontawesome@latest
# 安装classnames https://github.com/JedWatson/classnames
$ npm install classnames --save
# 安装 node-sass
$ npm install node-sass --save
# 安装 makedown-editer https://github.com/RIP21/react-simplemde-editor
$ npm install --save react-simplemde-editor easymde
# 安装 uuid
$ npm install --save uuid

## 创建 main.js 【electron 程序入口】
## 修改 package.json

# 启动项目
$ npm run dev
```

### main.js

```js
const { app, BrowserWindow } = require('electron')
const isDev = require("electron-is-dev")

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    const urlLocation = isDev ? "http://localhost:3000": "dummyurl"
    mainWindow.loadURL(urlLocation)
})
```

### package.json

```json
{
  "name": "cloud-doc",
  "version": "0.1.0",
  "private": true,
  "main": "main.js",  // 重点
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "concurrently \"cross-env BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\""  // 重点
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "concurrently": "^7.4.0",
    "cross-env": "^7.0.3",
    "electron": "^21.1.1",
    "electron-is-dev": "^2.0.0",
    "wait-on": "^6.0.1"
  }
}

```



## State 设计原则

- 最小化 State 原则
- DRY - Don‘t Repeat Yourself
- 有些数据可以根据已有 State 计算得出

