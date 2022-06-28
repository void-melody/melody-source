module.exports = {
    name: 'info',
    aliases: ['suggest', 'bot', 'bug', 'repo'],
    description: 'Displays general information about the bot',
    guildOnly: true,
    category: 'utility',
    execute: async (message) => {
        const {
            version
        } = require('../../package.json');
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle('Information')
            .addField('Support Server', '[Join here](https://discord.gg/9Gd82jJ)', true)
            .addField('Invite Me', '[Direct link](https://discord.com/oauth2/authorize?client_id=662469470618648576&scope=bot&permissions=67497158)', true)
            .addField('Suggestion or Bug?', '[Submit them here](https://github.com/void-melody/melody/issues/new/choose)', true)
            .addField('Website', '[Click here](https://melody.void206551.dev)', true)
            .addField('Vote', '[Vote For Me](https://top.gg/bot/662469470618648576/vote)', true)
            .addField('Donate', '[Buy Me A Coffee](https://ko-fi.com/void206551)', true)
            .addField('Legal', '[Privacy Policy](https://void206551.dev/projects/melody/legal)', true)
            .addField('Version', version, true)
            .setColor(0x00AE86)

        message.channel.send(embed).then().catch(console.error);
    },
}
