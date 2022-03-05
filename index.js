(require("dotenv")).config();
const Discord = require('discord.js');
const client = new Discord.Client({intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
]});
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    if (msg.content === "hey") {
    msg.reply("hi there");
    }
});

client.login(process.env.DISCORD_TOKEN);