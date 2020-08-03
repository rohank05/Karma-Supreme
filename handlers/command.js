//requirements
const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Commands");

//table for console to show command load status in proper manner (optional)
table.setHeading('Command','Load Status');

module.exports = (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        //looping through each file to save it in cache
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            //when a file is found
            if(pull.name){
                client.commands.set(pull.name,pull);
                table.addRow(file,'✅'); //when file is found
            }
            else{
                table.addRow(file,'✅ -> missing a help.name, or help.name is not a string.'); //when file is missing
                continue;
            }

            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name)); //if alias is found
        }
    });
    console.log(table.toString()); //printing table in console
}
