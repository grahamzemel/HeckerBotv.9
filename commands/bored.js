module.exports = {
    name: "bored",
    async execute(Discord, client, message, args) {
        const suggestions = ["Try making a portfolio website!", "Try coding a discord bot!", "Try updating your github with new projects!"]
    
        message.reply(suggestions[Math.floor(Math.random() * suggestions.length)])
        
    },
};
          // if(boredWords.some(word => message.content.includes(word))){
        //     const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
        //     message.reply(suggestion);
        // }
