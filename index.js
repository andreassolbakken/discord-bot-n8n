require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

// Initialize bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// Listen for messages
client.on("messageCreate", async (message) => {
    if (message.author.bot) return; // Ignore bot messages

    console.log(`📩 New message: ${message.content} from ${message.author.username}`);

    try {
        await axios.post(process.env.N8N_WEBHOOK_URL, {
            username: message.author.username,
            content: message.content,
            channel: message.channel.name,
            timestamp: message.createdAt,
        });
        console.log("✅ Sent message data to n8n");
    } catch (error) {
        console.error("❌ Error sending to n8n:", error.message);
    }
});

// Start bot
console.log("Loaded Token:", `"${process.env.DISCORD_TOKEN}"`);
// Debugging: Print the token before login
console.log("🔍 Loaded Token:", `"${process.env.DISCORD_TOKEN}"`);
console.log("📏 Token Length:", process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN.length : "Token not found");

// Debugging: Print the token before login
console.log("🔍 Loaded Token:", `"${process.env.DISCORD_TOKEN}"`);
console.log("📏 Token Length:", process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN.length : "Token not found");

// Start bot
client.login(process.env.DISCORD_TOKEN);


