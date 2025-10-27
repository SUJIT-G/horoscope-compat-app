
# Horoscope + Love Compatibility Mini App (Starter)

This is a small starter app to run a Horoscope + Love Compatibility WebApp that you can open from a Telegram bot.
It is intentionally minimal so beginners can run and deploy quickly.

## Features
- `/webapp` frontend: Get today's horoscope for any zodiac + Love compatibility checker
- Simple Node.js Express backend with endpoints:
  - `GET /api/horoscope/:zodiac`
  - `POST /api/compatibility`

## Quick start (locally)
1. Install Node.js (v16+).
2. Unzip the repo and `cd horoscope_compat_app`
3. `npm install`
4. `node server.js`
5. Open `http://localhost:3000/webapp` in your browser.

## Deploying
- Host on Railway / Render / Heroku / Vercel. Make sure the app is reachable via HTTPS (required for Telegram Web Apps).
- Place your Monetag / Adsterra ad snippets into `webapp/index.html` where indicated.

## Telegram
```
{"inline_keyboard":[[{"text":"Open Horoscope App","https://horoscope-love-compat/netlify.app":{"url":"https://horoscope-love-compat/netlify.app"}}]]}
```
[![Netlify Status](https://api.netlify.com/api/v1/badges/ef1a3c0e-2ede-49c1-98d3-15253551f24d/deploy-status)](https://app.netlify.com/projects/horoscope-love-compat/deploys)
