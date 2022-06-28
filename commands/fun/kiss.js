module.exports = {
    name: 'kiss',
    guildOnly: true,
    category: 'fun',
    usage: '[@user]',
    description: 'Kisses the mentioned user',
    execute: async (message) => {
        const { ksoft1 } = process.env

        const Discord = require('discord.js');
        const {
            KSoftClient
        } = require('@ksoft/api');
        const ksoft = new KSoftClient(ksoft1)
        let mentioned = message.mentions.members.first() || message.author

        async function main() {
            const {
                url
            } = await ksoft.images.random('kiss', {
                nsfw: false
            });
            const kiss = new Discord.MessageEmbed()
                .setDescription(`${mentioned} you got a kiss!`)
                .setColor(0x00AE86)
                .setImage(`${url}`)
            message.channel.send(kiss).then().catch(console.error);
        }

        await main();

    },
}

// Passed update check