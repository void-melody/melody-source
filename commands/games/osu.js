module.exports = {
    name: 'osu',
    guildOnly: true,
    description: 'See osu! user\'s public stats',
    usage: '[osu! username]',
    category: 'games',
    execute: async (message, args) => {
        const {
            getName
        } = require('country-list');
        const osu = require('node-osu');
        const Discord = require('discord.js')
        const osuApi = new osu.Api(process.env.osuKey, {
            notFoundAsError: false
        })

        let errArgs = new Discord.MessageEmbed()
            .setDescription('You did not specify who to get the stats of.')
        if (!args[0]) return message.channel.send(errArgs).then().catch(console.error);

        osuApi.getUser({
            u: args[0]
        }).then(user => {

            let errUser = new Discord.MessageEmbed()
                .setDescription('You did not type in a proper username!')
            if (!user.name) return message.channel.send(errUser).then().catch(console.error);

            let userAcc = JSON.parse(user.accuracy)
            let userLev = JSON.parse(user.level)

            let osuStat = new Discord.MessageEmbed()
                .setColor('#ff66aa')
                .setAuthor(user.name, `http://s.ppy.sh/a/${user.id}`, `https://osu.ppy.sh/users/${user.id}`)
                .setThumbnail('https://cdn.void206551.dev/images/osu/osu!.png')
                .addField("Country", `:flag_${user.country.toLowerCase()}: ${getName(user.country)}`)
                .addField("Accuracy", `${userAcc.toFixed(2)}%`)
                .addField("Letter Ranks", `<:ssh:803108301759709274>: ${user.counts.SSH}\n<:ss:803108301772029962>: ${user.counts.SS}\n<:sh:803108301721305091>: ${user.counts.SH}\n<:s_:803108301717110824>: ${user.counts.S}\n<:a_:803108301717635082>: ${user.counts.A}`, true)
                .addField("Hits", `<:300:803101201989369857>: ${user.counts[300]}\n<:100:803101202089771031>: ${user.counts[100]}\n<:50:803101201871798294>: ${user.counts[50]}`, true)
                .addField("Ranks", `Global: #${user.pp.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\nCountry: #${user.pp.countryRank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\nLevel: ${userLev.toFixed(0)}`, true)
            message.channel.send(osuStat).then().catch(console.error);

        });

    }
}