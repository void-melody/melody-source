module.exports = {
    name: 'ban',
    guildOnly: true,
    category: 'moderation',
    usage: '[user] {reason}',
    description: 'Bans the mentioned user from the server',
    execute: async (message, args) => {
        const Discord = require('discord.js')
        let xdemb = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle('Ban Command')
            .addField('Description:', 'Ban a member', true)
            .addField('Usage:', '-ban [user] [reason]', true)
            .addField('Example:', '-ban @user spam')

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Sorry you don\'t have permission to use this!').then().catch(console.error);

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(xdemb).then().catch(console.error);
        if (!member.bannable) return message.channel.send('I can\'t ban this user!').then().catch(console.error);

        if (member.id === message.author.id) return message.channel.send('You can\'t ban your self').then().catch(console.error);

        let reason = args.slice(1).join(` `);

        if (!reason) {
            let res = 'No reason given';
        } else {
            let res = `${reason}`
        }

        await member.ban({
            days: 0,
            reason: res
        }).catch(error => message.channel.send(`Sorry, I coldn't ban because of: ${error}`)).then().catch(console.error);

        let bean = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle(`Ban | ${member.user.tag}`)
            .addField('User', member, true)
            .addField('Moderator', message.author, true)
            .addField('Reason', res)
            .setTimestamp()

        message.channel.send(bean).then().catch(console.error);

    }
}

// Passed update check