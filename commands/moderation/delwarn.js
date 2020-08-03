const Discord = require('discord.js')
module.exports={
    name: 'delwarn',
    category: 'moderation',
    description:'To delete warn of user',
    usage: '<warn ID>',
    args: true,
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command");
        if(!args.length) return message.channel.send("Please provide an ID")
        var id = args[0];
        con.query(`SELECT * FROM warnings WHERE id=${id}`,(err,row)=>{
            if(err) return;
            if(!row.length>0) return message.channel.send("Warning not found")
            const embed = new Discord.MessageEmbed()
                                .setTitle('Warnings Deleted')
                                .setDescription('Warning:')
                                .addField(`${row[0].reason}`,`${row[0].id}`, true)
                                message.channel.send(embed)
                                con.query(`DELETE FROM warnings WHERE id=${id}`)
        })
        
    }
}