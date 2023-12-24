const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "empty_twitter_stream",
    description: 'remove all trackings!' ,
    async runInteraction(client,interaction){
        var embed = new EmbedBuilder()
        .setTitle('Removing tracks...')
        .setColor('#89D048')

        interaction.reply({content:' ', embeds: [embed]})

        const result = await client.removeAllHandlers()
        
        embed = new EmbedBuilder()
        .setTitle(`${result}`)
        .setColor('#89D048')
        interaction.editReply({content:' ', embeds: [embed], })
    }

}; 