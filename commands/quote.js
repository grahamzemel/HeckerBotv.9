const axios = require('axios');
module.exports = {
    name: "quote",
    async execute(Discord, client, message, args) {
        axios.get("https://quoteapiforbot.herokuapp.com/").then(function (response) {
            message.channel.send(`"${response.data}"`);
        }).catch(function (error) {
            message.channel.send(err);
        });
    },
};