module.exports = {
    name: 'sayto',
    category: 'utility',
    usage: 'Message',
    description: 'Command Melody to say something in a certain channel',
    guildOnly: true,
    execute: async (message, args) => {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            if (!args.length) {
                return message.channel.send(`You didn't provide anything to say, ${message.author}!`).then().catch(console.error);
            }
            let text = args.join(" ");
            let strt = args[0]

            if (strt.startsWith('<#')) {
                if (!args[1]) {
                    return message.channel.send(`You didn't provide anything to say, ${message.author}!`).then().catch(console.error);
                }
                let chnID = args[0].replace(/[<#>\s]/g, '')

                if (message.guild.channels.cache.get(chnID) === undefined) {
                    message.channel.send('That channel is not in this server!').then().catch(console.error);
                    return
                }
                message.guild.channels.cache.get(chnID).send(text.substring(22)).then().catch(console.error);

            } else {
                message.channel.send(text).then().catch(console.error);
            }

            message.delete().then().catch(console.error);
        } else {
            message.channel.send('You do not have permission to do this.').then().catch(console.error);
        }
    }
}