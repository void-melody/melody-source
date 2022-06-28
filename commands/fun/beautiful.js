module.exports = {
    name: 'beautiful',
    guildOnly: true,
    description: 'Grunkle Stan pointing at user\'s profile picture',
    category: 'fun',
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
            let image = await canvacord.Canvas.beautiful(avatar);
            const attachment = new Discord.MessageAttachment(image, "aww.png");

            const voteTrue = new Discord.MessageEmbed()
                .setTitle('you\'re adorable 🥰')
                .attachFiles(attachment)
                .setImage('attachment://aww.png');

            await message.channel.send(voteTrue).then().catch(console.error)


        } else if (didVote.voted === 0) {
            const voteFalse = new Discord.MessageEmbed()
                .setTitle('Votes')
                .setDescription(`It Looks like you haven't voted yet which means you cannot use this command.\n [Click me to vote](https://top.gg/bot/662469470618648576/vote)`)

            message.channel.send(voteFalse).then().catch(console.error);
        }

    },

}