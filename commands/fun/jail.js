module.exports = {
    name: 'jail',
    guildOnly: true,
    category: 'fun',
    description: 'Makes the user\'s profile grayscale and in jail',
    execute: async (message) => {
        const canvacord = require("canvacord");
        const Discord = require("discord.js")
        const { topToken } = process.env
        const got = require('got')
        let uID = message.author.id

        let authHead = {
            "Authorization": topToken
        }

        const getVote = await got(`https://top.gg/api/bots/662469470618648576/check?userId=${uID}`, {
            headers: authHead
        });

        let didVote = JSON.parse(getVote.body)

        if (didVote.voted === 1) {
            let avatar = message.author.displayAvatarURL({
                dynamic: false,
                format: 'png'
            });
            let image = await canvacord.Canvas.jail(avatar, true);
            const attachment = new Discord.MessageAttachment(image, "jail.png");

            const voteTrue = new Discord.MessageEmbed()
                .setTitle('to jail :angry:')
                .attachFiles(attachment)
                .setImage('attachment://jail.png');

            await message.channel.send(voteTrue).then().catch(console.error)


        } else if (didVote.voted === 0) {
            const voteFalse = new Discord.MessageEmbed()
                .setTitle('Votes')
                .setDescription(`It Looks like you haven't voted yet which means you cannot use this command.\n [Click me to vote](https://top.gg/bot/662469470618648576/vote)`)

            message.channel.send(voteFalse).then().catch(console.error);
        }

    },

}