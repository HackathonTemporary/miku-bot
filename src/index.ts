import { Client,GatewayIntentBits,EmbedBuilder } from "discord.js";
const images:string[]=require("../images.json");
import * as dotenv from "dotenv";
dotenv.config();
const Token=process.env.Bot_Token;
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Bot is alive!");
});
app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
});
if(!Token) throw new Error("Bot_Token is not set in env");
const client=new Client({
    intents:[GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const prefix="!";
client.on(`ready`,()=>{
    console.log(`Logged in as ${client.user?.tag}`)
});
client.on(`messageCreate`,async (message)=>{
  console.log(`[DEBUG] Got message: ${message.content}`);
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const [cmd]=message.content.slice(prefix.length).trim().split(/\s+/);
    if(cmd === 'miku' || cmd === 'migu')
    {
        if(images.length===0) 
        {
            return message.reply("No Miku images available!");
        }
        const url=images[Math.floor(Math.random()*images.length)];
        const embed=new EmbedBuilder().setTitle('🎀 Miku Miku oo ee oo 🎀')
        .setImage(url)
        .setColor(`#00aaff`)
        .setFooter({
            text:"Enjoy your Miku!"
        });
        await message.reply({
            embeds:[embed]
        });
    }
});
console.log("Bot Token exists:", !!Token);
console.log("Attempting to login with Discord bot...");
client.login(Token)
  .then(() => {
    console.log("Login successful");
  })
  .catch(err => {
    console.error("❌ Failed to login:", err); 
  });
