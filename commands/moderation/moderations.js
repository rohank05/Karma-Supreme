const Discord = require('discord.js')
module.exports = {
    name:'moderations',
    category: 'moderation',
    description:'To see all active moderations',
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command");
        con.query(`SELECT user, modtype, timeleft FROM moderations WHERE guild='${message.guild.id}'`,(err,row)=>{
            if(err) return;
            if(!row.length>0){
                var embed = new Discord.MessageEmbed()
                                .setDescription('No Moderations Found')
            }
            else{
                var n = row.length
                function moder(){
                    var finalString = ''
                    for(var i =0;i<n;i++){
                        var timeleft = parseInt(row[i].timeleft) - new Date()
                        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
                        var time = `${days} D, ${hours} H, ${minutes} M, ${seconds} S`;
                        finalString += `${row[i].modtype} | ${row[i].user} | Remaing: ${time}\n\n`
                    }
                    return finalString;
                }
                embed = new Discord.MessageEmbed()
                .setTitle(`${n} Moderations`)
                .setDescription(moder()) 
                }
                
                message.channel.send(embed)

            
        })
    }
}