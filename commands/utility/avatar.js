module.exports = {
    name: 'avatar',
    aliases: ['icon', 'avt'],
    category: 'utility',
    usage: '[@user]',
    description: 'Gets the mentioned user\'s avatar',
    guildOnly: true,
    execute(message) {
        const Discord = require('discord.js');
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor(0x333333)
            .setAuthor(`${user.username}'s Profile Picture`)
            .setImage(user.avatarURL({
                format: 'png',
                dynamic: true,
                size: 1024
            }));
        message.channel.send(avatarEmbed).then().catch(console.error);
    }
};
