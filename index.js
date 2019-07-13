const Discord = require('discord.js')
const fs = require('fs')
const { prefix, token } = require('./botconfig.json')

const client = new Discord.Client() // Client object
client.commands = new Discord.Collection() // Discord Collection object
// const cooldowns = new Discord.Collection() // Commands that are cooling down
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

  // // Add missing commands to the cooldowns collection
  // if (!cooldowns.has(command.name)) {
  //   cooldowns.set(command.name, new Discord.Collection())
  // }

  // // Create the cooldown timer
  // const now = Date.now() // Current time
  // const timestamps = cooldowns.get(command.name) // Commands specific cooldown
  // const cooldownLength = (command.cooldown || 3) * 1000 // convert to seconds

  // // If user has already used the command
  // if (timestamps.has(message.author.id)) {
  //   // add the cooldown time to the expiration time
  //   const expiration = timestamps.get(message.author.id) + cooldownLength

  //   // If the cooldown is still active
  //   if (now < expiration) {
  //     // Calculate seconds left on cooldown
  //     const countdown = (expiration - now) / 1000
  //     // Inform user of time left
  //     return message.reply(`Please wait ${countdown.toFixed(1)} more seconds.`)
  //   }
  //   timestamps.set(message.author.id, now)
  //   setTimeout(() => timestamps.delete(message.author.id), cooldownLength)
  // }

  // Attempt to run the command
  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('There was an issue running this command.')
  }
})

client.login(token)
