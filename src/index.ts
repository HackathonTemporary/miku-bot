import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import * as dotenv from "dotenv";
import express from "express";

// Load environment
dotenv.config();
const Token = process.env.Bot_Token;
if (!Token) throw new Error("❌ Bot_Token is not set in env");

// Setup express (for Render uptime ping)
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Bot is alive!");
});
app.listen(PORT, () => {
  console.log(`✅ Web server is running on port ${PORT}`);
});

// Import images
const images: string[] = require("../images.json");

// Setup Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = "!";

// Bot ready
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user?.tag}`);
});

// Handle messages
client.on("messageCreate", async (message) => {
  console.log(`[DEBUG] Got message: ${message.content}`);

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const [cmd] = message.content.slice(prefix.length).trim().split(/\s+/);

  if (cmd === "miku" || cmd === "migu") {
    if (images.length === 0) {
      return message.reply("⚠️ No Miku images available!");
    }

    const url = images[Math.floor(Math.random() * images.length)];
    const embed = new EmbedBuilder()
      .setTitle("🎀 Miku Miku oo ee oo 🎀")
      .setImage(url)
      .setColor("#00aaff")
      .setFooter({ text: "Enjoy your Miku!" });

    await message.reply({ embeds: [embed] });
  }
});

// Login
console.log("🚀 Attempting to login with Discord bot...");
client.login(Token).catch((err) => {
  console.error("❌ Failed to login:", err);
});

