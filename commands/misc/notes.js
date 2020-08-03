const Discord = require('discord.js')
module.exports = {
    name: 'notes',
    category: 'misc',
    description: 'To read notes of the user',
    usage: '<user>',
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command");
        let user = message.mentions.members.first() || message.guild.member(args[0])
        if(!user) return message.channel.send("User not found")
        con.query(`SELECT * FROM notes WHERE user='${user.user.id}')`,(err,row)=>{
            const embed = new Discord.MessageEmbed()
                                .setAuthor(`${user.user.username} has row.length notes`,user.user.displayAvatarURL())
            for(var i = 0;i<row.length;i++){
                embed.addField(`Note ${i}: `,`${row[i].notes}`)
            }
            message.channel.send(embed);
        })

    }
}