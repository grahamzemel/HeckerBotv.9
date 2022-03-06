const money = require('discord-money');
module.exports = {
    name: "payfine",
    async execute(Discord, client, message, args) {
        money.updateBal(message.author.id, -500).then((i) => { // Since the 'value' is -500, it will 'add' -500, making the bal $500 lower.
            message.channel.send(`**You paid your fine of $500!**\n**New Balance:** ${i.money}`);
        })
    },
};