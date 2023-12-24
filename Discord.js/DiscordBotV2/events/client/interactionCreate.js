module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if(interaction.isCommand() || interaction.isContexMenu){
            const cmd = client.commandsSlash.get(interaction.commandName);
            if(!cmd)
                return interaction.reply('this command doesn\'t exist');
            cmd.runInteraction(client,interaction);
        }
    }
};