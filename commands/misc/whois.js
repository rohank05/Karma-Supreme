const Discord = require("discord.js");
const { format } = require("path");


module.exports = {
    name: "whois",
    aliases: ["who", "user", "info"],
    description: "Returns user information",
    usage: "[username | id | mention]",
    run: (client, message, args) => {
        let inline = true
    const status = {
        online: " Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
      }
        
const member = message.mentions.members.first() || message.guild.member(args[0]) || message.member;


function formatDate(date){
    return new Intl.DateTimeFormat('en-US').format(date)
}
const joined = formatDate(member.joinedAt);

            let embed = new Discord.MessageEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail((member.user.displayAvatarURL({dynamic: true})))
                .setColor("#00ff00")
                .addField("Full Username", `${member.user.tag}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("Nickname", `${member}`, true)
                .addField("Registerd on", formatDate(member.user.createdAt),true)
                .addField("Joined server on", joined,true)
                .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(" ") || " No Roles"}`, true)
                
                .setFooter(`Information about ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            
    }
}