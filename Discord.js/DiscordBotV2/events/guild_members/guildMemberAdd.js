const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {

        const embed = new EmbedBuilder()
            .setAuthor({name:`${member.user.tag} (${member.id})`, iconURL:member.user.displayAvatarURL()}) //.user.displayAvatarURL: avatar user, .avatarURL: avatar server 
            .setColor('Green')
            .setDescription(`± UserName: ${member}
            ± Joined: <t:${parseInt(member.joinedTimestamp/1000)}:f> (<t:${parseInt(member.joinedTimestamp/1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({text:`User joined`});

        //send embed to logs channel
        const logChannel = client.channels.cache.get(process.env.LOGS_CHANNEL);
        logChannel.send({embeds: [embed] });
    }
};