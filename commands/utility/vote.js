module.exports = {
    name: 'vote',
    aliases: ['votes'],
    category: 'utility',
    description: 'Checks if the user has voted or not',
    execute: async (message) => {
        const Discord = require('discord.js')
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
            const voteTrue = new Discord.MessageEmbed()
                .setTitle('Votes')
                .setDescription(`Voting greatly helps out the bot grow and helps support the creator.\n [Click me to vote](https://top.gg/bot/662469470618648576/vote)`)
                .addField('​', 'It looks like you\'ve already voted. Thanks! You now have access to some more commands.')

            message.channel.send(voteTrue).then().catch(console.error)
        } else if (didVote.voted === 0) {
            const voteFalse = new Discord.MessageEmbed()
                .setTitle('Votes')
                .setDescription(`Voting greatly helps out the bot grow and helps support the creator.\n [Click me to vote](https://top.gg/bot/662469470618648576/vote)`)

            message.channel.send(voteFalse).then().catch(console.error);
        }

    },
}