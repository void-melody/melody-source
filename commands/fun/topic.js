module.exports = {
    name: 'topic',
    aliases: ['t'],
    guildOnly: true,
    description: 'Sends an open ended question or topic',
    category: 'fun',
    execute: async (message) => {
        let funRes = require('fun-responses')

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setDescription(await funRes.topic())
            .setColor(0x095256)
        message.channel.send(embed).then().catch(console.error);
    },
}

// Passed update check