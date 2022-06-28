module.exports = {
    name: 'mcskin',
    guildOnly: true,
    category: 'games',
    description: 'Gets Java Minecraft user\'s skin',
    usage: 'username',
    execute: async (message, args) => {
        const Discord = require('discord.js')
        const {
            fetchJson
        } = require('fetch-json');


        let embed = new Discord.MessageEmbed()
            .setDescription('You did not specify who to get the skin of.')
        if (!args[0]) return message.channel.send(embed).then().catch(console.error);

        let playername = args[0]
        let url = `https://api.mojang.com/users/profiles/minecraft/${playername}`

        const mcSkin = (data) => {
            let skinEmbed = new Discord.MessageEmbed()
                .setAuthor(`${data.name}'s Minecraft Skin`, `https://crafatar.com/avatars/${data.id}?overlay`)
                .setImage(`https://crafatar.com/renders/body/${data.id}?overlay`)

            let noskin = new Discord.MessageEmbed()
                .setDescription(`The user, \`${args[0]}\`, does not exist. Please check your spelling.`)

            if (!data.name) {
                message.channel.send(noskin).then().catch(console.error);

            } else {
                message.channel.send(skinEmbed).then().catch(console.error);

            }

        }
        fetchJson.get(url).then(mcSkin).catch(console.error);

    }
}

// Passed update check