const validateFlag = f => f === 'true' || f === 'false' || f === 'null';
module.exports = {
    name: 'lock',
    category: 'misc',
    description: 'To lock channels for role',
    usage: '<roleid><true|false>',
    run: (client,message,args)=>{
      if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You don't have permission to use this command");
        if(args.length !== 2) 
        return message.channel.send('?lock <ROLE_ID> TRUE | FALSE | NULL');
        var role = message.mentions.roles.first();
        var flag = args[1]
        
      if(validateFlag(flag.toLowerCase())) {
        if(role) {
          flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);          
            
              message.channel.updateOverwrite(role.id, {
                SEND_MESSAGES: !flag
              }).then(g => {
                message.channel.send(`Updated ${g.name} (${g.id})`); 
                if(flag) {
                  if(!g.name.endsWith('🔒')) {
                    g.edit({ name: g.name + ' 🔒'});
                  }
                } else {
                  g.edit({ name: g.name.replace(/\s*🔒/, '')});
                }
              })
              .catch(err => console.log(err));
          
        }
        else {
          message.channel.send('Invalid Role.');
        }
      }
    }
}