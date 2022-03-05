(require("dotenv")).config();
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE'],
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
});
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const prefix = "-";


client.commands = new Discord.Collection();
const files = fs.readdirSync(path.join(__dirname, "commands"));
for (const file of files) {
    const command = require(`./commands/${file}`);
    let commandName = file.split('.')[0];
    client.commands.set(commandName, command);
    console.log(`👌 Command loaded: ${commandName}`);
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async function (message) {
    if (message.author.bot) return
    if (message.content.startsWith(prefix)) {
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        let command = client.commands.get(args[0]);
        client.commands.get(command.name).execute(Discord, client, message, args);
    }
    // if (msg.content === "$inspire") {
    //     getQuote().then(quote => msg.channel.send(quote))
    // }
    // if (msg.content === "hey") {
    //     msg.reply("hi there")
    // } else if (msg.content === "u good bro") {
    //     msg.channel.send("nah")
    // } else if (msg.content === "gzemel is epic") {
    //     msg.react("❤️")
    // }
    // else if (msg.content === "gimme mod") {
    //     msg.reply("Applying mod role...")
    //     msg.member.roles.add("873405376345813024");
    // }


})
// function getQuote() {
//     return fetch("https://zenquotes.io/api/random")
//         .then(res => {
//             return res.json()
//         })
//         .then(data => {
//             return data[0]["q"] + " -" + data[0]["a"]
//         })
// }
client.login(process.env.DISCORD_TOKEN);