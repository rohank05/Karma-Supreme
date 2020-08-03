const Discord = require('discord.js')
module.exports = {
    name: 'ban',
    category: 'moderation',
    description: 'to ban user from the server',
    usage: '<id | mention>',
    run: (client,message,args,con)=>{
        //check if message author has the permission
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have permission to use this command");
        
        //check if bot has the permission
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply("I don't have permission to ban members");
        
        // getting the user detail from args
        var member = message.mentions.members.first() || message.guild.member(args[0])

        //if no user is found
        if(!member) return message.channel.send("No user found"); //if no user is found
        
        //if the arg is the bot
        if(member.user.id===client.user.id) return message.channel.send('You tried to BAN me, I am going to complain to Dion Sama'); //if the arg is the bot
        
        //if the user also have ban member permission
        if(member.hasPermission('BAN_MEMBERS')) return message.channel.send('I can\'t BAN this user') ;
        
        //if reason is also mentioned
        let reason = args.slice(1).join(' ');
        
        //creating embeds to send
        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Banned`,member.user.displayAvatarURL())
                            .setColor('#7851a9')
                            .setDescription(`You have been Banned from \`\`${message.guild.name}\`\``)
                            .addField('Banned by', message.author, true)
        const embed1 = new Discord.MessageEmbed()
                            .setAuthor(`Banned`,member.user.displayAvatarURL())
                            .setColor('#7851a9')
                            .setDescription(`${member.user.username} have been Banned`)
                            .addField('Banned by', message.author, true)
            
            //if reason is mentioned then adding it to warnings list
            if(reason){
                var sql = SqlString.format(`INSERT INTO warnings(guild,user,id,adm,reason)VALUES(?,?,?,?,?)`,[message.guild.id,member.user.id,message.id,message.author.username,reason])
                con.query(sql);
                embed1.addField('Reason',`${reason}`);
            }
            //if reason is not mentioned
            else{
                embed.addField('Reason',`No Reason Given.`)
                embed1.addField('Reason',`No Reason Given.`)
            }
            //adding user to banlist for future reference
            con.query(`INSERT INTO banlist(guild,user,userid) VALUES('${message.guild.id}','${member.user.username}','${member.user.id}')`);
            
            message.channel.send(embed1);
            //in case the dm is closed catch will work
            member.send(embed).catch(function(err){
                console.log("Cant send DMs");
            }).then(()=>{
                  member.ban(reason).catch(err=>{
                      message.channel.send(`Ban failed here is the ${err}`);
                  })
              })                 
    }

}