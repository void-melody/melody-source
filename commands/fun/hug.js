module.exports = {
    name: 'hug',
    category: 'fun',
    description: 'Hugs the mentioned user',
    usage: '[@user]',
    execute: async (message) => {
        const { ksoft1 } = process.env

        const Discord = require('discord.js');
        const {
            KSoftClient
        } = require('@ksoft/api');
        const ksoft = new KSoftClient(ksoft1)

        if (message.channel.type === 'dm') {
            async function dmMain() {
                const {
                    url
                } = await ksoft.images.random('hug', {
                    nsfw: false
                });
                const hug = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setImage(`${url}`)
                message.channel.send(hug).then().catch(console.error);
            }
            await dmMain()
        } else {

            async function main() {

                let mentioned = message.mentions.members.first() || message.author

                const {
                    url
                } = await ksoft.images.random('hug', {
                    nsfw: false
                });
                const hug = new Discord.MessageEmbed()
                    .setDescription(`${mentioned} you got a hug!`)
                    .setColor(0x00AE86)
                    .setImage(`${url}`)
                message.channel.send(hug).then().catch(console.error);
            }

            await main();
        }
    },
}

// Passed update check