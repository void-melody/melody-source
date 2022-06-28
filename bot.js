require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const {version} = require('./package.json')
const {prefix, token, topToken} = process.env
const Statcord = require("statcord.js");

const bot = new Discord.Client({
    disableMentions: 'everyone'
});
bot.commands = new Discord.Collection();
bot.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}

const statcord = new Statcord.Client({
    client: bot,
    key: process.env.statcordKey,
    postCpuStatistics: true,
    postMemStatistics: true,
    postNetworkStatistics: true,
});

bot.once('ready', () => {
    console.log(`[bot] Bot is ready and is on version ${version}`);
    bot.user.setActivity('for -help | I go beep boop', {
        type: 'WATCHING'
    })
        .then().catch(console.error);
    console.log('Ready!');
    statcord.autopost().then().catch(console.error);
});

bot.on("guildCreate", async guild => {
    console.log(`[bot] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    console.log(`[bot] I am now working in ${bot.guilds.cache.size}!`)
});

bot.on("guildDelete", guild => {
    console.log(`[bot] I have been removed from: ${guild.name} (id: ${guild.id})`);
    console.log(`[bot] I am now working in ${bot.guilds.cache.size}!`)
});

bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!');
        }
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    const {cooldowns} = bot;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, bot);
        statcord.postCommand(commandName, message.author.id).then().catch(console.error)
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

// Top.gg Posting
// const AutoPoster = require('topgg-autoposter')
//
// const ap = AutoPoster(topToken, bot)
//
// ap.on('posted', () => {
//     console.log('[top.gg] Server count posted!');
//     console.log(`[bot] Bot is working in ${bot.guilds.cache.size} servers.`);
// })

// Statcord Posting
statcord.on("autopost-start", () => {
    console.log("[statcord] Started autopost");
});
statcord.on("post", status => {
    if (!status) console.log("[statcord] Successful post");
    else console.error(status);
});

bot.login(token).then().catch(console.error);
