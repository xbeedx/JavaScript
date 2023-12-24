const { EmbedBuilder } = require('discord.js');


module.exports = {
    name: "add_twitter_rule",
    description: 'Track a twitter profile!' ,
    options: [
        {
            name: 'handler',
            description: 'handler of the twitter profile',
            type: 3,
            required: true
        }, 
        {
            name: 'channel',
            description: 'channel to send the tweets',
            type: 7,
            required: true,
            channel_types: [0]
        }
    ],
    async runInteraction(client,interaction){
        const handler = interaction.options.getString('handler');
        const channel = interaction.options.getChannel('channel')
        const channelId = channel.id

        const result = await client.createHandler(handler,channelId)

        var embed = new EmbedBuilder()
        .setTitle(`Tracking: ${handler} on channel: ${channel}\nstream restarting...`)
        .setColor('#89D048')

        await interaction.reply({content:' ', embeds: [embed]})

        embed = new EmbedBuilder()
        .setTitle(`${result}`)
        .setColor('#89D048')
        interaction.editReply({content:' ', embeds: [embed]})

        console.log( await client.getAllHandlers())
    }

}; 

