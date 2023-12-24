const { startStream } = require('../../twitterClient.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "start_twitter_stream",
    description: 'Start Twitter Stream!' ,
    async runInteraction(client,interaction){
        var embed = new EmbedBuilder()
        .setTitle('Stream setting...')
        .setColor('#89D048')

        interaction.reply({content:' ', embeds: [embed], ephemeral: true})

        const result = await startStream(client);
        embed = new EmbedBuilder()
        .setTitle(`${result}`)
        .setColor('#89D048')
        interaction.editReply({content:' ', embeds: [embed], ephemeral: true})
    }

}; 