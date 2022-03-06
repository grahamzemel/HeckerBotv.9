const { SlotMachine, SlotSymbol } = require('../src/index.js');
const money = require('discord-money');
module.exports = {
    name: "slots",
    async execute(Discord, client, message, args) {
        const coins = playSlots();
        money.updateBal(message.author.id, coins /* Value */).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
            message.channel.send(`**You got $`+ coins +`!**\n**New Balance:** ${i.money}`);
        })
    },
};

function playSlots(){
    money.updateBal(message.author.id, -250 /* Value */).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
        message.channel.send(`**You spun the slot machine! $-250!**\n**New Balance:** ${i.money}`);
    })
    const cherry = new SlotSymbol('cherry', {
        display: '🍒',
        points: 10,
        weight: 100
    });

    const money = new SlotSymbol('money', {
        display: '💰',
        points: 100,
        weight: 50
    });

    const wild = new SlotSymbol('wild', {
        display: '❔',
        points: 10,
        weight: 50,
        wildcard: true
    });

    const machine = new SlotMachine(3, [cherry, money, wild]);
    const results = machine.play();
    return results.totalPoints + "\n" + results.visualize(false);
}