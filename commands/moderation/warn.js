const Discord = require('discord.js')
var SqlString = require('sqlstring');
module.exports = {
    name: 'warn',
    category: 'moderation',
    description: 'Warn command is use to warn users',
    usage: '<id | mention> <reason>',
    run: (client,message,args,con)=>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command");
        let reason = args.slice(1).join(" ")
        let user = message.mentions.members.first() || message.guild.member(args[0])
        if(!user) return message.channel.send("Please provide user to warn")
        if(reason.length<1) return message.channel.send("Please provide a reason for the warn")
        const dmembed = new Discord.MessageEmbed()
                        .setTitle('Warn')
                        .setColor('#7851a9')
                        .setDescription(`You have been warned on \`\`${message.guild.name}\`\``)
                        .addField('Warned by', message.author, true)
                        .addField('Reason', reason,true)
                        .setTimestamp()
                        .setFooter(`ID: ${message.id}`);
        user.send(dmembed);
        const embed = new Discord.MessageEmbed()
                        .setTitle('Warn')
                        .setColor('RED')
                        .setDescription(`${user.user} has been warned`)
                        .addField('Warned by', message.author, true)
                        .addField('Reason', reason,true)
                        .setTimestamp()
                        .setFooter(`ID: ${message.id}`);
        message.channel.send(embed);
        var sql = SqlString.format(`INSERT INTO warnings(guild,user,id,adm,reason)VALUES(?,?,?,?,?)`,[message.guild.id,user.user.id,message.id,message.author.username,reason])
        con.query(sql);
    }
}