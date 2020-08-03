module.exports = {
    name: 'say',
    description: 'To make a sticky message',
    usage: '<message>',
    category: 'misc',
    run: async(client,message,args)=>{
        message.delete();
        var msg = args.join(" ");
        client.stickyMessage = await message.channel.send(msg);
        console.log(client.stickyMessage); 
    }
}