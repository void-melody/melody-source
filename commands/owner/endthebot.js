module.exports = {
    name: 'endthebot',
    categoty: 'owner',
    execute: async (message) => {
        const owner = '455428041586376729';
        if (message.author.id === owner) {
            message.channel.send(`Ok, ${message.author}, I'll turn off`).then().catch(console.error);
            setTimeout(() => {
                process.exit(0);
            }, 5000);
        } else {
            return message.channel.send('You are not able to force the bot to turn off').then().catch(console.error);
        }
    },
}
