import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const TOKEN = "8445347566:AAG06-mGUvevb2BG8qqj6_KD03ehwwB_joU";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const PORT = process.env.PORT || 5000;

app.post(URI, async (req, res) => {
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: `AI aktif bre 😎 — lu ngetik: ${text}`,
  });
  return res.send();
});

app.get("/", (req, res) => {
  res.send("BreCorp AI bot jalan 🚀");
});

app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
