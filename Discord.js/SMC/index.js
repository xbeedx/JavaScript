const { Client, Collection,GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose');
const client = new Client({intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]});

client.commands = new Collection();

['CommandUtil','EventUtil'].forEach(handler => {require(`./utils/handlers/${handler}`)(client)});

process.on('exit', code => {console.log(`process stopped with the code : ${code}!` )})
process.on('uncaughtException', (err, origin)=> { console.log(`UNCAUGHT_EXCEPTION: ${err}`, `Origin: ${origin} `)});
process.on('unhandledRejection', (reason, promise)=> {console.log(`UNHANDLED_REJECTION: ${reason}\n-----\n`,promise)});
process.on('warning', (...args)=> console.log(...args));

//DB
mongoose.connect(process.env.DATABASE_URI).then(()=> {console.log('the client is connected to the DB!');}).catch(err=>{console.log(err);});

client.login(process.env.DISCORD_TOKEN);



