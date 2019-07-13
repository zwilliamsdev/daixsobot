module.exports = {
  name: 'args-info',
  description: 'Information about provided arguments',
  args: true, // Command expects arguments,
  usage: 'args1 args2 args3...',
  guildOnly: true,
  cooldown: 10,
  execute (message, args) {
    if (args[0] === 'foo') {
      return message.channel.send('bar')
    }

    message.channel.send(`Arguments: ${args}\nArguments Length: ${args.length}`)
  }
}
