module.exports = {
    name: 'altcaps',
    category: 'fun',
    usage: 'Message',
    description: 'Sends a message in alternate case',
    guildOnly: true,
    execute: async (message, args) => {
        function swapCase(text) {
            return text.split('').map((c, i) =>
                i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()
            ).join('');
        }
        if (!args.length) {
            return message.channel.send(`You didn't provide anything to say, ${message.author}!`).then().catch(console.error);
        }
        let text = args.join(" ");
        message.delete().then().catch(console.error);
        message.channel.send(swapCase(text)).then().catch(console.error);
    }
}

// Passed update check