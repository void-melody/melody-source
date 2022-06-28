module.exports = {
    name: 'kick',
    guildOnly: true,
    category: 'moderation',
    usage: '[user] {reason}',
    description: 'Kicks the mentioned user from the server',
    execute: async (message, args) => {
        const Discord = require('discord.js');

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Sorry, you don\'t have permissions to use this!').then().catch(console.error);

        let xdemb = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle('Kick Command')
            .addField('Description:', 'Kick a member', true)
            .addField('Usage:', '-kick [user] [reason]', true)
            .addField('Example:', '-kick @user spam')

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(xdemb).then().catch(console.error);

        if (!member.kickable)
            return message.channel.send('I cannot kick this user!').then().catch(console.error);


        let reason = args.slice(1).join(' ');
        if (!reason) {
            let res = 'No reason given';
        } else {
            let res = `${reason}`
        }

        await member.kick(reason)
            .catch(error => message.reply(`Sorry, I couldn't kick because of : ${error}`)).then().catch(console.error);

        let kick = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle(`Kick | ${member.user.tag}`)
            .addField('User', member, true)
            .addField('Moderator', message.author, true)
            .addField('Reason', res)
            .setTimestamp()
            .setFooter(member.id)

        message.channel.send(kick).then().catch(console.error);
    },
};

// Passed update check