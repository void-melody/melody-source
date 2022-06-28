module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Pings the bot\'s latency',
    category: 'utility',
    execute: async (message) => {
        const Discord = require('discord.js');
        const {
            version
        } = require('../../package.json')
        const ping = new Discord.MessageEmbed()
            .setTitle('Ping')
            .setDescription('Ping?')
            .setColor(0xDFF8EB)
            .setFooter(`Version ${version}`)
        message.channel.send(ping).then(m => {
            const pong = new Discord.MessageEmbed()
                .setTitle('Ping')
                .setDescription(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. 🏓`)
                .setColor(0xDFF8EB)
                .setFooter(`Version ${version}`)
            m.edit(pong)
        }).catch(console.error);

    },
};