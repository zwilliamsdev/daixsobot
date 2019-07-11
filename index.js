const Discord = require('discord.js')
const fs = require('fs')
const config = require('./botconfig.json')

const bot = new Discord.Client()

bot.on('ready', () => console.log(`${bot.user.username} is ready to get to work!`))

bot.login(config.token)
