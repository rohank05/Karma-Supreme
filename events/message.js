const Discord = require('discord.js')
const {prefix} = require('../botconfig.json')
const {con} = require('../modules/mysql.js') //getting db connection from mysql.js
var activ = 'Chinu\'s pretty face'
module.exports = async(client,message) => {
    console.log(message.channel);
    
    if(message.author.bot) return; //return if message is from bot


    if(!message.content.startsWith(prefix)) return; //return if message don't start with prefix
    
    //working with commands
    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase();
    if(cmd.length===0) return; //return if it's only prefix without command
    let command = client.commands.get(cmd); //get command from command folder
    if(!command) client.commands.get(client.aliases.get(cmd)); //get command if command's alias is used

    if(command){
        command.run(client,message,args,con);
        
        if(command.category==='moderation'){
            const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag,message.author.displayAvatarURL())
            .setDescription(`used \`\`${cmd}\`\` in ${message.channel}\n${message.content}`)
            .setTimestamp()
         let apchannel =   message.guild.channels.cache.find(c=>c.id==='627962801305944087'||c.name==='server-logs')
         apchannel.send(embed).catch((err)=>{console.log(err)})
        }
        

    } 
    if(message.content.toLowerCase() === '>activity'){
        if(message.member.roles.cache.find(r => r.id === '662227713624637460')){
            await message.channel.send("```What do you want me to watch```");
            let answer = await message.channel.awaitMessages(answer => answer.author.id != client.user.id,{max: 1});
            activ = (answer.map(answers => answers.content).join())
            message.channel.send('I am watching ' + activ + ' now!')
        }
        else{
            message.channel.send("Only Staff can set the bot status!!")
        }
      } 

    client.user.setStatus('Online');
    client.user.setActivity(activ, {type: 'WATCHING'});
}