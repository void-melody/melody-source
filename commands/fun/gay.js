module.exports = {
    name: 'gay',
    guildOnly: true,
    category: 'fun',
    description: 'Puts a pride flag overlay over a user\'s profile picture',
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
            let image = await canvacord.Canvas.rainbow(avatar);
            const attachment = new Discord.MessageAttachment(image, "gay.png");

            const voteTrue = new Discord.MessageEmbed()
                .setTitle('gay lol')
                .attachFiles(attachment)
                .setImage('attachment://gay.png');

            await message.channel.send(voteTrue).then().catch(console.error)


        } else if (didVote.voted === 0) {
            const voteFalse = new Discord.MessageEmbed()
                .setTitle('Votes')
                .setDescription(`It Looks like you haven't voted yet which means you cannot use this command.\n [Click me to vote](https://top.gg/bot/662469470618648576/vote)`)

            message.channel.send(voteFalse).then().catch(console.error);
        }

    },

}