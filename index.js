//Requirements
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const {token} = require('./botconfig.json')
client.userMap = new Map()



client.on('inviteCreate', async invite=>client.invite.set(invite.guild.id, await invite.guild.fetchInvites())); //the event handler was taking it needed to write extra so quick fix

//Commands handlers prerequisits
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');
//reading dir for handlers
['command','events'].forEach(handlers=>{
    require(`./handlers/${handlers}`)(client); //getting handler code from handlers folder
});






client.login(token) //login

