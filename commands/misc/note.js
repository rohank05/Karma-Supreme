module.exports = {
    name: 'note',
    category: 'misc',
    description: 'To add notes to the user',
    usage: '<user> <note>',
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command");
        let user = message.mentions.members.first() || message.guild.member(args[0])
        if(!user) return message.channel.send("User not found")
        let note = args.slice(1).join(' ')
        if(!note) return message.channel.send('Please write note also')
        con.query(`INSERT INTO notes(guild,user,notes) VALUES('${message.guild.id}','${user.user.id}','${note}')`)
        message.channel.send(`${user.user.username} note added`)

    }
}