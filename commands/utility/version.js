module.exports = {
    name: 'version',
    aliases: ['v'],
    category: 'utility',
    description: 'Shows the current version of the bot',
    execute: async (message) => {
        const Discord = require('discord.js');
        const {
            version
        } = require('../../package.json')
        const ver = new Discord.MessageEmbed()
            .setDescription(`I'm on version ${version}`)
            .setColor(0xa47fc9)
        message.channel.send(ver).then().catch(console.error);
    },
}
