const ms = require('ms');
const Discord = require('discord.js')

const countdown = require('countdown-js')
module.exports = {
    name: 'mute',
    category: 'moderation',
    description: 'To mute a user',
    usage: '<time> [reason]',
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You don't have permission to use this command");
        var member = message.mentions.members.first() || message.guild.member(args[0])
        if(!args[1]) return message.channel.send("Please mention the time");
        var time = ms(args[1])
        if(isNaN(time)) return message.channel.send('Please mention the the time in this format: 1d , 1h, 1m, 1s')
        let reason = args.slice(2).join(' ')
        
        con.query(`SELECT roleid FROM muterole WHERE guild = ${message.guild.id}`,(err,row)=>{
            if(err) return;
            if(!row.length>0) return message.channel.send("No muted role found, Please add mute role by using 'addmute' command")
            var roleid = row[0].roleid;       
            if(!message.guild.me.hasPermission('MUTE_MEMBERS')) return message.reply("I don't have permission to ban members");     
            if(!member) return message.channel.send("No user found")
            if(member.user.id===client.user.id) return message.channel.send('You tried to mute me, I am going to complain to Nabe Sama')
            if(member.hasPermission('MUTE_MEMBERS')) return message.channel.send('I can\'t mute this user')
            
            if(member.roles.cache.has(roleid)) return message.channel.send("User is already muted")
            member.roles.add(roleid)
            
            const embed = new Discord.MessageEmbed()
                            .setTitle('Mute')
                            .setColor('#7851a9')
                            .setDescription(`You have been Muted on \`\`${message.guild.name}\`\``)
                            .addField('Muted by', message.author, true)
                            .addField('Time', args[1],true)
                            .setTimestamp()
                            .setFooter(`ID: ${message.id}`);
            
            const embed1 = new Discord.MessageEmbed()
                            .setTitle('Mute')
                            .setColor('#7851a9')
                            .setDescription(`${member.user.username} have been Muted`)
                            .addField('Muted by', message.author, true)
                            .addField('Time', args[1],true)
                            .setTimestamp()
                            .setFooter(`ID: ${message.id}`);
            if(reason){
                var sql = SqlString.format(`INSERT INTO warnings(guild,user,id,adm,reason)VALUES(?,?,?,?,?)`,[message.guild.id,member.user.id,message.id,message.author.username,reason])
                con.query(sql);
                embed1.addField('Reason',`${reason}`)
            }
            else{
                embed.addField('Reason',`No Reason Given.`)
                embed1.addField('Reason',`No Reason Given.`)
            }
            member.send(embed).catch(function(){
                console.log("DM Closed")
            })
            message.channel.send(embed1);
            var end = new Date(new Date().getTime() + time)
            end = end.getTime()
            con.query(`INSERT INTO moderations VALUES('${member.user.username}','mute','${message.guild.id}','${end}','${message.id}')`)

            setTimeout(function(){
                con.query(`DELETE FROM moderations WHERE guild='${message.guild.id}' AND user='${member.user.id}'`)
                member.roles.remove(roleid);
                const embed2 = new Discord.MessageEmbed()
                            .setTitle('Unmute')
                            .setColor('#7851a9')
                            .setDescription(`${member.user.username} have been Unmuted`)
                            .addField('Unmuted by', client.user, true)
                            .addField('Time', args[1],true)
                            .setTimestamp()
                            let apchannel = message.guild.channels.cache.find(c=>c.id==='627962801305944087'||c.name==='server-logs')
                            apchannel.send(embed2).catch((err)=>{console.log(err)})

            },time)
            
        })
    }
}