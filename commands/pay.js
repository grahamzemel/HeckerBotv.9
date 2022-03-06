const money = require('discord-money');
module.exports = {
    name: "pay",
    async execute(Discord, client, message, args) {
        money.updateBal(message.author.id, 500 /* Value */).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
            message.channel.send(`**You got $500!**\n**New Balance:** ${i.money}`);
        })
    },
};
