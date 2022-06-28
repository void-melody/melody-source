module.exports = {
    name: 'joke',
    aliases: ['j'],
    guildOnly: true,
    category: 'fun',
    description: 'Sends a joke',
    execute: async (message) => {
        let funRes = require('fun-responses')

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setDescription(await funRes.joke())
            .setColor(0x095256)
        message.channel.send(embed).then().catch(console.error);
    },
}

// Passed update check