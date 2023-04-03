module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log('I\'m Ready');

        const devGuild = await client.guilds.cache.get(process.env.SERVER_ID)
        devGuild.commands.set(client.commands.map(cmd=>cmd));
    }
}