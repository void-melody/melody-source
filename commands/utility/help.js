module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	category: 'utility',
	cooldown: 0,
	execute(message, args) {
		const Discord = require('discord.js');
		const {
			prefix
		} = process.env

		const {
			commands
		} = message.client;

		if (!args.length) {
			const helpList = new Discord.MessageEmbed()
				.setTitle('My Commands')
				.setDescription(`You can do \`${prefix}help \[command\]\` to learn more about the command. `)
				.addField('😆 Fun', (commands.map(command => {
					if (command.category === "fun") return command.name
				})).join(' '))
				.addField('🎮 Games', (commands.map(command => {
					if (command.category === "games") return command.name
				})).join(' '))
				.addField('💣 Moderation', (commands.map(command => {
					if (command.category === "moderation") return command.name
				})).join(' '))
				.addField('⚙️ Utility', (commands.map(command => {
					if (command.category === "utility") return command.name
				})).join(' '))

			message.channel.send(helpList).then().catch(console.error)
		} else {

			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('that\'s not a valid command!');
			}

			const helpCommand = new Discord.MessageEmbed()
				.setTitle(`**Name:** ${command.name}`)

			if (command.aliases) helpCommand.addField(`**Aliases:**`, `${command.aliases.join(', ')}`);
			if (command.category) helpCommand.addField(`**Category:**`, `${command.category}`)
			if (command.description) helpCommand.addField(`**Description:**`, `${command.description}`);
			if (command.usage) helpCommand.addField(`**Usage:**`, `${prefix}${command.name} ${command.usage}`);

			helpCommand.addField(`**Cooldown:**`, `${command.cooldown || 3} second(s)`);

			message.channel.send(helpCommand).then().catch(console.error)
		}
	},
};