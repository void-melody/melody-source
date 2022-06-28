module.exports = {
    name: 'cookie',
    usage: '[@user]',
    description: 'Gives the user a cookie',
    category: 'fun',
    execute: async (message, args) => {
        if (!args[0]) {
            message.channel.send('You didn\'t mention anyone to give a cookie to! ').then().catch(console.error);
        } else {
            let cookieGet = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            return message.channel.send(`Hey ${cookieGet}, you just got a cookie from ${message.author.username}! <a:cookie:807613308735717396>`).then().catch(console.error);
        }
    },
}