const prefix = '!';

module.exports = {
    name: "messageCreate",
    once: false,
    execute(client, message){
        //ignore if sent by the bot
       if(message.author.bot) return;

       //ignore if no prefix
       if(!message.content.startsWith(prefix)) return;

       //get the args : words after prefix
       const args = message.content.slice(prefix.length).trim().split(/ +/g);

       //name cmd
       const cmdName = args.shift().toLowerCase();
       const cmdName2 = cmdName + " " + args.join(" ");
       if (cmdName2.length == 0) return;

       //if cmd declared, execute
       if (client.commands.get(cmdName2)) 
            client.commands.get(cmdName2).run(client, message, args);
        else  if (client.commands.get(cmdName)) 
            client.commands.get(cmdName).run(client, message, args);
        else 
            console.log(message.content + " not registered")
    }
}