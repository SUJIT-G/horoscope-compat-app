
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
- Create a bot with BotFather and use an InlineKeyboard Web App button to open `https://yourdomain.com/webapp`
- Example reply_markup:
```
{"inline_keyboard":[[{"text":"Open Horoscope App","web_app":{"url":"https://yourdomain.com/webapp"}}]]}
```

If you want, I can create a step-by-step GitHub push + Railway/Vercel deploy guide next.
