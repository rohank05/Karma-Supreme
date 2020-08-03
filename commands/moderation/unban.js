const Discord = require('discord.js')
const client = new Discord.Client()
module.exports = {
    name: 'unban',
    category: 'moderation',
    description: 'to unban user from the server',
    usage: '[user]',
    run: async(client,message,args,con)=>{
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission to use this command");
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply("I don't have permission to ban members");
        var member = args[0]
        
        var ban = await message.guild.fetchBans();
        if(!ban.get(member)) return message.channel.send('This user is not banned')
        await message.guild.members.unban(member)
        con.query(`SELECT user FROM banlist WHERE userid='${member}'`,(err,row)=>{
            if(err) return;
            if(!row.length>0) return message.channel.send('User has been unbanned But I coudn\'t find it in my ban list')
            var username = row[0].user;
            const embed1 = new Discord.MessageEmbed()
                            .setTitle(`Unbanned`,)
                            .setColor('#7851a9')
                            .setDescription(`${username} have been Unbanned`)
                            .addField('Unbanned by', message.author, true)
            message.channel.send(embed1);
        })
        con.query(`DELETE FROM banlist WHERE userid='${member}' AND guild='${message.guild.id}'`)
       
            
    }

}