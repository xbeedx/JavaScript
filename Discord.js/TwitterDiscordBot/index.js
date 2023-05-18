const { Client,GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const { startStream } = require("./twitterClient.js")

const discordClient = new Client({intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]});

discordClient.login(process.env.DISCORD_TOKEN);
discordClient.on('ready', () => {
    console.log("Ready")
})

startStream(discordClient)