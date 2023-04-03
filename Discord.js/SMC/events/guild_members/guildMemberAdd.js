const { EmbedBuilder, Formatters } = require('discord.js');
const dayjs = require('dayjs');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member){

        const creationTS = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeCreationTS = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const joinTS = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeJoinTS = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);

        const embed = new EmbedBuilder()
        .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()})
        .setColor('#21ff90')
        .setDescription(`± User name: ${member}
        ± Created on: ${creationTS} (${relativeCreationTS})
        ± Joined on: ${joinTS} (${relativeJoinTS})
        `)
        .setTimestamp()
        .setFooter({text: 'User joined!' });

        const logChannel = client.channels.cache.get('1042929980646113370');
        logChannel.send({embeds: [embed]});
    }
}

/*

*/ 