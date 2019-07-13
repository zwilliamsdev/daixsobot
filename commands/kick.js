module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  args: true, // No arguments expected
  usage: '@username',
  guildOnly: true, // Will not work in a DM
  cooldown: 0,
  execute (message, args) {
    const mentioned = message.mentions.users.first()
    message.channel.send(`[DEBUG]: This would have kicked ${mentioned.username}`)
  }
}
