module.exports = {
    name: 'say',
    usage: 'Message',
    description: 'Command Melody to say something',
    guildOnly: true,
    category: 'utility',
    execute: async (message, args) => {
        if (!args.length) {
            return message.channel.send(`You didn't provide anything to say, ${message.author}!`).then().catch(console.error);
        }
        let text = args.join(" ");
        message.delete().then().catch(console.error);
        message.channel.send(text).then().catch(console.error);
    }
}
