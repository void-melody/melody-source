module.exports = {
	name: 'wholesome',
	guildOnly: true,
	category: 'fun',
	description: 'Sends a wholesome meme',
	execute: async (message) => {
		// const redditimage = require("reddit.images");
		// const Discord = require('discord.js');
		// const wholesome = await redditimage.fetch({
		//     type: "custom",
		//     subreddit: ["wholesomememes", "wholesome", "lovememes", "HumansBeingBros"],
		// });
		// const wholeRes = new Discord.MessageEmbed()
		//     .setAuthor(wholesome[0].title, null, wholesome[0].postLink)
		//     .setImage(wholesome[0].image)
		//     .setFooter(`r/${wholesome[0].subreddit}`)
		// message.channel.send(wholeRes).then().catch(console.error);

		message.channel.send('This command is currently disabled due to a back-end vulnerability.')
	}
}

// Passed update check