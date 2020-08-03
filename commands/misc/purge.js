const message = require("../../events/message");

module.exports = {
    name: 'purge',
    category:'misc',
    description: 'To delete messages',
    run: async(client,message,args)=>{
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don\'t have permission to use this message")
        if(!args.length) return message.channel.send("Provide number of messages")
        if(isNaN(args[0])) return message.channel.send("Provide number of messages")
        message.delete();
        const fetched = await message.channel.messages.fetch({limit: args[0]})
        message.channel.bulkDelete(fetched)
    }
}