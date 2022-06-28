module.exports = {
    name: 'userinfo',
    aliases: ['user'],
    category: 'utility',
    description: 'Gets the mentioned user\'s account info',
    usage: '[@user | User ID]',
    guildOnly: true,
    execute: async (message, args) => {
        const Discord = require('discord.js');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const status = {
            online: "Online",
            idle: "Idle",
            dnd: "Do Not Disturb",
            offline: "Offline/Invisible"
        }

        const statColor = {
            online: "#43b581",
            idle: "#faa61a",
            dnd: "#f04747",
            offline: "#747f8d"
        }

        const botUser = {
            true: "Yes",
            false: "No"
        }

        let dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        let embed = new Discord.MessageEmbed()
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 64}))
            .setColor(statColor[member.user.presence.status])
            .addField("Full Username", `${member.user.tag}`, true)
            .addField("ID", `\`${member.user.id}\``, true)
            .addField("Bot", botUser[member.user.bot], true)
            .addField("Status", `${status[member.user.presence.status]}`, true)
            .addField("Nickname", `${member.nickname !== null ? `${member.nickname}` : "None"}`, true)
            .addField("Joined Discord At", (member.user.createdAt).toLocaleDateString("en-US", dateOpts), true)

        message.channel.send(embed).then().catch(console.error);
    }
}