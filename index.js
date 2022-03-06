(require("dotenv")).config();
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const money = require('discord-money');
const prefix = "-";

const client = new Discord.Client({
    partials: ['MESSAGE'],
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
});

module.exports = require("./src/index.js");





client.commands = new Discord.Collection();
const files = fs.readdirSync(path.join(__dirname, "commands"));
for (const file of files) {
    const command = require(`./commands/${file}`);
    let commandName = file.split('.')[0];
    client.commands.set(commandName, command);
    console.log(`👌 Command loaded: ${commandName}`);
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Skinny Turtles#5811", { type: "PLAYING" });

});


client.on("messageCreate", async function (message) {
    if (message.author.bot) return
    if (message.content.startsWith(prefix)) {
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        let command = client.commands.get(args[0]);

        Array.from(client.commands.keys());
        for (let i = 0; i < [...client.commands.keys()].length; i++) {
            // console.log(command.name === [...client.commands.keys()][i]);
            if (command == undefined) {
                message.reply("Not valid command!")
                break;
            }
            else if (command.hasOwnProperty('name')) {
                client.commands.get(command.name).execute(Discord, client, message, args);
                break;
            }


        }


    }
}
)
client.login(process.env.DISCORD_TOKEN);