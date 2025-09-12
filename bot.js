const TelegramBot = require("node-telegram-bot-api");

// BotFather se liya hua token yahan daalo
const TOKEN = process.env.BOT_TOKEN ||

// Apke Railway / Vercel / Render ka live domain yahan daalo
const WEBAPP_URL = "https://your-railway-app-url.up.railway.app/webapp";

const bot = new TelegramBot(TOKEN, { polling: true });

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "🌌 Welcome to Horoscope + Love Compatibility Bot!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✨ Open Horoscope App",
            web_app: { url: WEBAPP_URL }
          }
        ]
      ]
    }
  });
});
