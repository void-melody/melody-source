module.exports = {
    name: 'toast',
    guildOnly: true,
    category: 'fun',
    description: 'Compliments the mentioned user',
    execute: async (message) => {
        let funRes = require('fun-responses')

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setDescription(await funRes.toast())
            .setColor(0x095256)
        message.channel.send(embed).then().catch(console.error);
    },
}

// Passed update check