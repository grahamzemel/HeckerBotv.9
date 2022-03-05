const { User } = require("discord.js");

module.exports = {
    name: "ban",
    async execute(Discord, client, message, args) {
        const arguments = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix

        const user = message.mentions.users.first(); // returns the user object if an user mention exists
        const reason = args.slice(1).join(' '); // Reason of the ban (Everything behind the mention)

        // Check if an user mention exists in this message
        if (!user) {
            try {
                // Check if a valid userID has been entered instead of a Discord user mention
                if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
                // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
                user = message.guild.members.get(arguments.slice(0, 1).join(' '));
                user = user.user;
            } catch (error) {
                return message.reply('Couldn\' get a Discord user with this userID!');
            }
        }
        if (user === message.author) return message.channel.send('You can\'t ban yourself'); // Check if the user mention or the entered userID is the message author himsmelf
        if (!reason) return message.reply('You forgot to enter a reason for this ban!'); // Check if a reason has been given by the message author

        await message.guild.members.cache.get(user.id).ban({days: 0, reason: reason}) // Bans the user
        message.channel.send(user + " has been BANNED... (" + reason + ")"); // Sends a confirmation embed that the user has been successfully banned

        const modlogChannelID = ''; // Discord channel ID where you want to have logged the details about the ban
        if (modlogChannelID.length !== 0) {
            if (!client.channels.get(modlogChannelID)) return undefined; // Check if the modlogChannelID is a real Discord server channel that really exists

            const banConfirmationEmbedModlog = new Discord.RichEmbed()
                .setAuthor(`Banned by **${msg.author.username}#${msg.author.discriminator}**`, msg.author.displayAvatarURL)
                .setThumbnail(user.displayAvatarURL)
                .setColor('RED')
                .setTimestamp()
                .setDescription(`**Action**: Ban
                **User**: ${user.username}#${user.discriminator} (${user.id})
                **Reason**: ${reason}`);
            client.channels.get(modlogChannelID).send({
                embed: banConfirmationEmbedModlog
            }); // Sends the RichEmbed in the modlogchannel
        }

    }

}