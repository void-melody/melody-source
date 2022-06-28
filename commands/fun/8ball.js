module.exports = {
    name: '8ball',
    aliases: ['8','ball'],
    description: 'Give an answer to a question',
    usage: '[Question]',
    category: 'fun',
    execute: async (message, args) => {
        const Discord = require('discord.js');
        const got = require('got')

        let qString = (args.join(" ")).toString();

        const url = `https://8ball.delegator.com/magic/JSON/${qString}`

        const askQuestion = await got(url)
        let qResponse = JSON.parse(askQuestion.body).magic

        let eColor = {
            "Contrary": "#f2543d",
            "Neutral": "#EEEEEE",
            "Affirmative": "#38C477"
        }

        let que = await qResponse.question
        let ans = await qResponse.answer
        let col = await eColor[qResponse.type]

        let leBall = new Discord.MessageEmbed()
            .setTitle('🎱 Magic 8 Ball')
            .addField('Question:', que, false)
            .addField('Answer:', ans, false)
            .setColor(col)

        message.channel.send(leBall).then().catch(console.error)

    },
};