const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    category: 'moderation',
    description: 'to kick user from the server',
    usage: '<id | mention> [reason]',
    run: (client,message,args,con)=>{
        //check if message author has the permission
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission to use this command");
        //check if bot has the permission
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply("I don't have permission to ban members");

        // getting the user detail from args
        var member = message.mentions.members.first() || message.guild.member(args[0])

        //if no user is found
        if(!member) return message.channel.send("No user found"); //if no user is found
        
        //if the arg is the bot
        if(member.user.id===client.user.id) return message.channel.send('You tried to Kick me, I am going to complain to Zhou Sama'); //if the arg is the bot
        
        //if the user also have ban member permission
        if(member.hasPermission('BAN_MEMBERS')) return message.channel.send('I can\'t BAN this user') ;
        
        //if reason is also mentioned
        let reason = args.slice(1).join(' ');
        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Kicked`,member.user.displayAvatarURL())
                            .setColor('#7851a9')
                            .setDescription(`You have been Kicked from \`\`${message.guild.name}\`\``)
                            .addField('Kicked by', message.author, true)
        const embed1 = new Discord.MessageEmbed()
                            .setAuthor(`Kicked`,member.user.displayAvatarURL())
                            .setColor('#7851a9')
                            .setDescription(`${member.user.username} have been Kicked`)
                            .addField('Kicked by', message.author, true)
       
            if(reason){
                var sql = SqlString.format(`INSERT INTO warnings(guild,user,id,adm,reason)VALUES(?,?,?,?,?)`,[message.guild.id,member.user.id,message.id,message.author.username,reason])
                con.query(sql);
                embed.addField('Reason',`${reason}`)
                embed1.addField('Reason',`${reason}`)
            }
            else{
                embed.addField('Reason',`No Reason Given.`)
                embed1.addField('Reason',`No Reason Given.`)
            }
            message.channel.send(embed1)
            member.send(embed).catch(function(err){
                message.channel.send("Coudn't send user the reason. Reason logged")
            }).then(function () {
                
                  member.kick(reason)
            })
                  
        
                            
    }

}