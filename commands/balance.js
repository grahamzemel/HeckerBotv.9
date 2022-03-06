const money = require('discord-money');
module.exports = {
    name: "balance",
    async execute(Discord, client, message, args) {
        money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
            message.channel.send(`**Balance:** ${i.money}`);
        })
    },
};
