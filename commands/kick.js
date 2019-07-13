module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  args: true, // Arguments expected
  usage: '@username',
  guildOnly: true, // Will not work in a DM
  cooldown: 0,
  execute (message, args) {
    // Person to kick
    const mentioned = message.mentions.members.first() || message.guild.members.get(args[0])
    const reason = args.join(' ').slice(1)

    // Check if person running command has perms
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(`${message.author.username} who do you think you are trying to kick people....`)
    }
  }
}
