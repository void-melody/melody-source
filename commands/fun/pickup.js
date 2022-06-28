module.exports = {
    name: 'pickup',
    guildOnly: true,
    description: 'Sends a pickup line',
    category: 'fun',
    execute: async (message) => {
        let funRes = require('fun-responses')

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setDescription(await funRes.pickup())
            .setColor(0x095256)
        message.channel.send(embed).then().catch(console.error);
    },
}

// Passed update check