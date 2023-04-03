const { Client,GatewayIntentBits,Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

const Oni = new Client({intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]});

//require('./utils/handlers/EventUtil')(Oni);
//require('./utils/handlers/CommandUtil')(Oni);
['CommandUtil','EventUtil'].forEach(handler => {require(`./utils/handlers/${handler}`)(Oni)});

Oni.commands = new Collection();


  
Oni.login(process.env.DISCORD_TOKEN);