module.exports = {
    name: 'botinfo',
    aliases: ['binfo'],
    categoty: 'owner',
    execute: async (message, args, bot) => {
        const Discord = require('discord.js')
        const owner = '455428041586376729';
        const {
            version
        } = require('../../package.json')

        if (message.author.id === owner) {

            let totalSeconds = (bot.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            let guildAmount = bot.guilds.cache.size;

            let botInfo = new Discord.MessageEmbed()
                .setTitle('Current Bot Stats')
                .addField('Uptime', uptime, false)
                .addField('Guild Count', guildAmount, false)
                .addField('Ping', 'Pong?', false)
                .addField('Version', version, false)
            message.channel.send(botInfo).then(m => {
                const pong = new Discord.MessageEmbed()
                    .setTitle('Current Bot Stats')
                    .addField('Uptime', uptime, false)
                    .addField('Guild Count', guildAmount, false)
                    .addField('Ping', `${m.createdTimestamp - message.createdTimestamp}ms`, false)
                    .addField('Version', version, false)
                m.edit(pong)
            }).catch(console.error);

        } else {
            return message.channel.send('You are not able to see that stats of the bot.').then().catch(console.error);
        }
    },
}
