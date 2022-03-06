const blackjack = require("discord-blackjack")

module.exports = {
    name: "blackjack",
    async execute(Discord, client, message, args) {
        blackjack(message);       
    },
};
  