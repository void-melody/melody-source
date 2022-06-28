module.exports = {
    name: 'meme',
    guildOnly: true,
    description: 'Sends a meme',
    category: 'fun',
    execute: async (message) => {
        // const redditimage = require("reddit.images");
        // const Discord = require('discord.js');
        // const meme = await redditimage.fetch({
        //     type: "meme",
        //     subreddit: ["AdviceAnimals", "wholesomememes", "MemeEconomy", "ComedyCemetery", "memes", "dankmemes", "terriblefacebookmemes", "funny"],
        // });
        // const memeRes = new Discord.MessageEmbed()
        //     .setAuthor(meme[0].title, null, meme[0].postLink)
        //     .setImage(meme[0].image)
        //     .setFooter(`r/${meme[0].subreddit}`)
        // message.channel.send(memeRes).then().catch(console.error);
    //

        message.channel.send('This command is currently disabled due to a back-end vulnerability.')
    }
}