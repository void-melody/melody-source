module.exports = {
    name: 'emoji',
    description: 'Use a server emoji with this command to enlarge it',
    category: 'owner',
    execute: async (message) => {
        const Discord = require('discord.js')

        if (message.content.match(/<a:.+?:\d+>/g)) {
            let emo = message.content.match(/\d+>/g)
            let emojiID = String(emo).substring(0, 18)
            let embed = new Discord.MessageEmbed()
                .setTitle(message.content.match(/:.+?:/g))
                .setImage(`https://cdn.discordapp.com/emojis/${emojiID}.gif`)
            return message.channel.send(embed).then().catch(console.error);
        }

        if (message.content.match(/<:.+?:\d+>/g)) {
            let emo = message.content.match(/\d+>/g)
            let emojiID = String(emo).substring(0, 18)
            let embed = new Discord.MessageEmbed()
                .setTitle(message.content.match(/:.+?:/g))
                .setImage(`https://cdn.discordapp.com/emojis/${emojiID}.png`)
            return message.channel.send(embed).then().catch(console.error);
        }

        if (!message.content.match(/<:.+?:\d+>|<a:.+?:\d+>/g)) {
            return message.channel.send('Use an emoji with this command to enlarge it.')
        }
    },
}