
module.exports = {
    name: 'addmute',
    category: 'moderation',
    description: 'to add new/update mute role for the server',
    usage: '[role]',
    args: true,
    guildOnly: true,
    run: (client,message,args,con)=>{
        //check if message author has the permission
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You don't have permission to use this command");
        var role = message.mentions.roles.first(); //get role by mention
        if(!role) return message.channel.send("Mention Role!!!") //checking role
        con.query(`SELECT * FROM muterole WHERE guild=${message.guild.id}`,(err,row)=>{ //getting role from to check if new mute role or have to update
            if(err) return;
            if(!row.length>0){
                con.query(`INSERT INTO muterole VALUES('${message.guild.id}','${role.id}')`)
                message.channel.send("Mute role has been added")
                
            }
            else{
                con.query(`UPDATE muterole SET roleid = ${role.id} WHERE guild=${message.guild.id}`)
                message.channel.send("Mute role Updated!!!")
                
            }
        })
    }
}