import TelegramBot from "node-telegram-bot-api";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const app = express();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  if (!userMessage) return;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    await bot.sendMessage(chatId, reply);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    await bot.sendMessage(chatId, "⚠️ Terjadi kesalahan, coba lagi nanti bre.");
  }
});

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Server aktif di port", process.env.PORT || 10000);
});
