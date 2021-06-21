# GitLab Time Tracker (gitlab-time-tracker)

GitLab Time Tracker

## Issues
If you found a bug, or you have an idea how to improve this tool, create an issue in GitLab.

## Installation
1. Clone project
2. Run `npm install && npm run build` from project root directory
3. Go to 'Extentions' page in your Chrome, Chromium, Brave or other Chromium-based browser
4. Turn on developer mode
5. Click 'Load Unpacked Extension'
6. Navigate to project folder and choose `dist/spa` folder
7. Click the 'puzzle' icon (top-right) and pin the **GitLab Time Tracker** to the Chrome Extensions bar

## How to use
First you need to set GitLab API link and Private Access Token on 'Settings' page. Click on save and
go to Dashboard. Here you can go to 'Projects' or to 'Report' page.

## Development
**GitLab Time Tracker** is a VueJS SPA, created with Quasar CLI and supports development with a Webpack DevServer(Hot Module Replacement).
To start DevServer run `npm run serve` from project root folder.

**Attention**: Chrome API doens't work if using webpack DevServer.
If you want to test some Chrome API function, you have to install the extension to your browswer
and click 'refresh' button on extension card.

## Dev Docs
https://developer.chrome.com/docs/extensions/
