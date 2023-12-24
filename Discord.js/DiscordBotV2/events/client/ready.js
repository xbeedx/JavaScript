//Bot ready and initialized
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Bot Ready');

        //ID server
        const devGuild = await client.guilds.cache.get(process.env.SERVER_ID);

        //set / commands to server
        devGuild.commands.set(client.commandsSlash.map(cmd => cmd));
    }
};