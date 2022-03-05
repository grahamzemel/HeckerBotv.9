(require("dotenv")).config();
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE'],
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
});
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    if (msg.content === "hey") {
        msg.reply("hi there")
    } else if (msg.content === "u good bro") {
        msg.channel.send("nah")
    } else if (msg.content === "rtn is epic") {
        msg.react("❤️")
    }
    else if (msg.content === "gimme mod") {
        msg.member.roles.add("873405376345813024");
        }
})

client.login(process.env.DISCORD_TOKEN);