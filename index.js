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


client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}!`);
});


client.on("messageCreate", async function (message) {
    if (message.author.bot) return
    currency.add(message.author.id, 1);
    if (message.content.startsWith(prefix)) {
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        let command = client.commands.get(args[0]);
        client.commands.get(command.name).execute(Discord, client, message, args);
    }
    
})




client.login(process.env.DISCORD_TOKEN);