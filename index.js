const Discord = require('discord.js')
const fs = require('fs')
const { prefix, token } = require('./botconfig.json')

const client = new Discord.Client() // Client object
client.commands = new Discord.Collection() // Discord Collection object

// Create list of command files skipping anything that isn't a JS file
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

// Runs when server is ready
client.on('ready', () => console.log(`${client.user.username} is ready to get to work!`))

// Loop through command files and create commands collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  // Create new item in Collection
  // key: command name, value: exported module
  client.commands.set(command.name, command)
}

client.on('message', message => {
  // if the message does not start with prefix or is a bot end execution
  if (!message.content.startsWith(prefix) || message.author.bot) return

  // split spaces to grab arguments list regex handles multiple spaces
  const args = message.content.slice(prefix.length).split(/ +/)
  // shift returns the first argument and removes it from args
  const commandName = args.shift().toLowerCase()

  // If the command does not exist exit
  if (!client.commands.has(commandName)) return

  // Load command the user is attempting to run
  const command = client.commands.get(commandName)

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('This command will not work in a direct message.')
  }

  // If command expects args and args length is 0
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments.`

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
    }

    return message.channel.send(reply)
  }

  try {
    command.execute(message, args).bind()
  } catch (error) {
    console.error(error)
    message.reply('There was an issue running this command.')
  }
})

client.login(token)
