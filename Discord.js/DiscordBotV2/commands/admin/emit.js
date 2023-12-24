const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "emit",
    description: 'emit a chosen event' ,
    options: [
        {
            name: 'event',
            description: 'choose an event to emit',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                }
            ]
        }
    ],
    runInteraction(client,interaction){
        const eventChoices = interaction.options.getString('event');
        if(eventChoices == 'guildMemberAdd'){
            client.emit('guildMemberAdd', interaction.member);
            //ephemereal: true => sender is the only one to see the reply
            interaction.reply({content: 'Event guildMemberAdd emited!', ephemeral: true});
        } else{
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({content: 'Event guildMemberRemove emited!', ephemeral: true});
        }
    }
};