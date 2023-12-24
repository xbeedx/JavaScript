const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "ping",
    description: 'Command ping!' ,
    async runInteraction(client,interaction){
        const tryPing = await interaction.reply({content:"we try to ping... a moment!", fetchReply: true, ephemeral: true});
        const embed = new EmbedBuilder()
        .setTitle('🏓 Pong!')
        .setThumbnail(client.user.displayAvatarURL())
        //if only one field => .addField('Latency', client.ws.ping, true);
        .addFields(
            {name: 'API Latency', value:`\`${client.ws.ping}ms\``, inline: true},
            {name: 'Bot Latency', value:`\`${tryPing.createdTimestamp - interaction.createdTimestamp}ms\``, inline: true},
            //inline false by default 
            //bot uptime 
            //{name: 'Uptime', value:`<t:${parseInt(client.readyTimestamp / 1000)}:R>`}
        )
        .setTimestamp()
        .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});

       interaction.editReply({content:' ', embeds: [embed], ephemeral: true})
    }
};