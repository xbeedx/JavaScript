module.exports = {
    name: 'emit',
    description: 'emit event' ,
    run(client, message, args){
        if(!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) return message.reply('please enter valid event');
        if(args[0]=='guildMemberAdd') {
            client.emit('guildMemberAdd',message.member);
            message.reply('Event guildMemberAdd emited');
        } else {
            client.emit('guildMemberRemove',message.member);
            message.reply( 'Event guildMemberRemove emited');
        }
    },
    options: [
        {
            name: 'event',
            description: 'choose event to emit',
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
    runSlash(client, interaction){
        const eventChoices = interaction.options.getString('event');
        if(eventChoices=='guildMemberAdd') {
            client.emit('guildMemberAdd',interaction.member);
            interaction.reply({content: 'Event guildMemberAdd emited', ephemereal: true })
        } else {
            client.emit('guildMemberRemove',interaction.member);
            interaction.reply({content: 'Event guildMemberRemove emited', ephemereal: true })
        }
    }
};