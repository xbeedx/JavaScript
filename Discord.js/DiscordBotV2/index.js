const { Client,GatewayIntentBits,Collection } =  require('discord.js')
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose')


const client = new Client({intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
]});

//load commands
client.commands = new Collection(); //toRemove
client.commandsSlash = new Collection();

//logs
process.on('exit', code => {console.log(`process stopped with the code : ${code}!` )})
process.on('uncaughtException', (err, origin)=> { console.log(`UNCAUGHT_EXCEPTION: ${err}`, `Origin: ${origin} `)});
process.on('unhandledRejection', (reason, promise)=> {console.log(`UNHANDLED_REJECTION: ${reason}\n-----\n`,promise)});
process.on('warning', (...args)=> console.log(...args));

//Database connect
mongoose.set("strictQuery",false);
mongoose.connect(process.env.DATABASE_URI).then(()=> {console.log('client is connected to the database');}).catch(err=>{console.log(err);});

['CommandUtil','EventUtil'].forEach(handler => {require(`./utils/handlers/${handler}`)(client)});
require('./utils/Functions')(client)

client.login(process.env.DISCORD_TOKEN)
