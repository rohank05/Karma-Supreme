const Discord = require('discord.js')
module.exports = {
    name: 'unmute',
    category: 'moderation',
    description: 'to unmute muted users',
    usage: '[user]',
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You don't have permission to use this command");
        if(!message.guild.me.hasPermission('MUTE_MEMBERS')) return message.reply("I don't have permission to ban members");
        var member = message.mentions.members.first() || message.guild.member(args[0])
        con.query(`SELECT roleid FROM muterole WHERE guild = ${message.guild.id}`,(err,row)=>{
            if(err) return;
            if(!row.length>0) return message.channel.send("No muted role found, Please add mute role by using 'addmute' command")
            var roleid = row[0].roleid;
            if(!member) return message.channel.send("No user found")
            if(!member.roles.cache.has(roleid)) return message.channel.send("User is not muted")
            con.query(`DELETE FROM moderations WHERE user='${member.user.username}' AND modtype='mute'`)
            member.roles.remove(roleid)
            const embed = new Discord.MessageEmbed()
                                    .setTitle('Auto[Unmute]')
                                    .setColor('#7851a9')
                                    .setDescription(`You have been Unmuted`)
                    member.send(embed).catch(function(err) {
                        console.log('DM closed')
                    })
                    const embed2 = new Discord.MessageEmbed()
                                    .setTitle('Auto[Unmute]')
                                    .setColor('#7851a9')
                                    .setDescription(`${member.user.username} have been Unmuted`)
                    message.channel.send(embed2);
        })
    }
}