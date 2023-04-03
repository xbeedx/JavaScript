const { EmbedBuilder, Formatters } = require('discord.js');
const dayjs = require('dayjs');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member){
        const creationTS = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeCreationTS = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const joinTS = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeJoinTS = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const leftTS = Formatters.time(dayjs().unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeLeftTS = Formatters.time(dayjs().unix(), Formatters.TimestampStyles.RelativeTime);

        const embed = new EmbedBuilder()
        .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()})
        .setColor('#dc143c')
        .setDescription(`± User name: ${member.displayName}
        ± Created on: ${creationTS} (${relativeCreationTS})
        ± Joined on: ${joinTS} (${relativeJoinTS})
        ± Left on: ${leftTS} (${relativeLeftTS})
        `)
        .setTimestamp()
        .setFooter({text: 'User left!' });

        const logChannel = client.channels.cache.get('1042929980646113370');
        logChannel.send({embeds: [embed]});
    }
}

/*

*/ 