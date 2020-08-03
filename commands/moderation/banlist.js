const Discord = require('discord.js')

module.exports = {
    name: 'banlist',
    category: 'moderation',
    description: 'To get banlist',
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission to use this command");
        con.query(`SELECT * FROM banlist WHERE guild='${message.guild.id}'`,(err,row)=>{
            if(err) throw err;
            if(!row.length>0) return message.channel.send("No Bans");
            var user = []
            let userid = []
            let time = []
            var n = row.length;
            for(var i =row.length-1;i>=0;i--){
                user.push(row[i].user);
                userid.push(row[i].userid);
                time.push(row[i].time);
            }
            
            function banlist(){
                var finalString ='';
                for(var i=0;i<n;i++){
                    var date = new Date(`${time[i]}`)
                    var month = date.getMonth()
                    var year = date.getFullYear()
                    date = date.getDate()
                    date = `${date}/${month}/${year}`
                    
                    finalString +=`${user[i]} | ${userid[i]} - ${date}\n`
                }
                return finalString;
            }
            const embed = new Discord.MessageEmbed()
                            .setTitle('BANLIST')
                            .setDescription(banlist())
                            .setTimestamp()
            
            
            
            message.channel.send(embed)
        })
    }
}