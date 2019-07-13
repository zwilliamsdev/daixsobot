module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: false, // No arguments expected
  usage: '',
  guildOnly: false,
  cooldown: 5, // Time in seconds before command can be reused
  execute (message, args) {
    message.channel.send('Pong.')
  }
}
