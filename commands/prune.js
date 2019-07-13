module.exports = {
  name: 'prune',
  description: 'Prune X amount of lines from channel.',
  args: true, // Command expects arguments
  usage: '#',
  guildOnly: true,
  cooldown: 5,
  execute (message, args) {
    // account for your message in the pruning
    const amount = parseInt(args[0]) + 1

    // if amount is not a number quit, if amount is less than 2 or more than 100 quit
    if (isNaN(amount)) return message.reply(`That doesn't seem to be a valid number.`)
    if (amount < 2 || amount > 100) return message.reply('You need to use a number between 1 and 99.')

    // Delete X messages from channel command was used from
    message.channel.bulkDelete(amount, true)
      .catch(err => {
        console.error(err)
        message.send.channel('There was an error pruning messages in this channel.')
      })
  }
}
