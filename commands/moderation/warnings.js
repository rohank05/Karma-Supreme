const Discord = require('discord.js')
var SqlString = require('sqlstring');
module.exports = {
    name: 'warnings',
    category: 'moderation',
    description: 'To gat all warnings of the user',
    usage: '<id || mention>',
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command");
        let user = message.mentions.members.first() || message.guild.member(args[0])
        if(!user) return message.channel.send("User not found")
        con.query(`SELECT * FROM warnings WHERE guild='${message.guild.id}' AND user='${user.user.id}'`,(err,row)=>{
            if(err) throw err;
            if(!row.length>0) return message.channel.send("No Warnings");
            var id = []
            let reasons = []
            let time = []
            let moderator = []
            var n = row.length;
            for(var i =0;i<n;i++){
                id[i] = row[i].id;
                reasons[i] = row[i].reason;
                time[i] = row[i].wati;
                moderator[i] = row[i].adm;
            }
            
            
            const embed = new Discord.MessageEmbed()
                            .setAuthor(`${user.user.username} has ${n} Warnings`, user.user.displayAvatarURL())
                            .setDescription('Warnings')
                            .setTimestamp()
            
            for(var i=0;i<n;i++){
                var date = new Date(`${time[i]}`)
                var month = date.getMonth()
                var year = date.getFullYear()
                var week = date.getDay()
                date = date.getDate()
                date = `${date}/${month}/${year}`
                
                embed.addField(`ID: ${id[i]} | Moderator: ${moderator[i]}`,`${reasons[i]} - ${date}`)
            }
            
            message.channel.send(embed)
        })
    }
}