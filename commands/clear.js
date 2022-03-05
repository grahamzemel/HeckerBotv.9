module.exports = {
    name: "clear",
    async execute(Discord, client, message, args) {
        const [command, input] = args;
        if (Number(input) < 0) {
            return message.channel
                .send('Enter a positive number')
                .then((sent) => {
                    setTimeout(() => {
                        sent.delete();
                    }, 2500);
                });
        }
        if(Number(input) > 100){
            return message.channel
                .send('Max is 100 messages in one command')
                .then((sent) => {
                    setTimeout(() => {
                        sent.delete();
                    }, 2500);
                });
        }
        // add an extra to delete the current message too
        const amount = Number(input);

        message.channel.bulkDelete(amount, true)
            .then((_message) => {
                message.channel
                    // do you want to include the current message here?
                    // if not it should be ${_message.size - 1}
                    .send(`Bot cleared \`${_message.size}\` messages :broom:`)
                    .then((sent) => {
                        setTimeout(() => {
                            sent.delete();
                        }, 2500);
                    });
            });
    },
};