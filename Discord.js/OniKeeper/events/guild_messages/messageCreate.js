const prefix = '!';

module.exports = {
    name: "messageCreate",
    once: false,
    execute(Oni, message){
        //ignore if sent by the bot
       if(message.author.bot) return;

       //ignore if no prefix
       if(!message.content.startsWith(prefix)) return;

       //get the args : words after prefix
       const args = message.content.slice(prefix.length).trim().split(/ +/g);

       //name cmd
       const cmdName = args.shift().toLowerCase();
       if (cmdName.length == 0) return;

       let cmd = Oni.commands.get(cmdName);
       //if cmd declared, execute
       if (cmd) cmd.run(Oni, message, args);
    }
}