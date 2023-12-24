const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/events/*/*.js`)).map(async eventFile => {

        //process.cwd() : /*/*/*/clientKeeper
        //eventFile) : /*/*/*/clientKeeper/events/client/ready.js

        const event = require(eventFile);

        if(!eventList.includes(event.name) || !event.name)
            return console.log(`-----\nEvent not loaded: typo and/or no name\nFile -> ${eventFile}\n-----`);

        if(event.once){
            //client.once('ready',()=> 
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }

        //log
        console.log(`Event loaded : ${event.name} `);
    });
} 

const eventList  = ['applicationCommandPermissionsUpdate','autoModerationActionExecution','autoModerationRuleDelete','autoModerationRuleCreate','autoModerationRuleUpdate','channelDelete','channelPinsUpdate','channelCreate','channelUpdate','debug','emojiCreate','error','emojiDelete','emojiUpdate','error','guildBanAdd','guildBanRemove','guildCreate','guildDelete','guildIntegrationsUpdate','guildMemberAdd','guildMemberAvailable','guildMemberRemove','guildMembersChunk','guildMemberUpdate','guildScheduledEventCreate','guildScheduledEventDelete','guildScheduledEventUpdate','guildScheduledEventUserAdd','guildScheduledEventUserRemove','guildUnavailable','guildUpdate','interactionCreate','invalidated','inviteCreate','inviteDelete','messageCreate','messageDelete','messageDeleteBulk','messageReactionAdd','messageReactionRemove','messageReactionRemoveAll','messageReactionRemoveEmoji','messageUpdate','presenceUpdate','ready','roleCreate','roleDelete','roleUpdate','shardDisconnect','shardError','shardReady','shardReconnecting','shardResume','stageInstanceCreate','stageInstanceDelete','stageInstanceUpdate','stickerCreate','stickerDelete','stickerUpdate','threadCreate','threadDelete','threadListSync','threadMembersUpdate','threadMemberUpdate','threadUpdate','typingStart','userUpdate','voiceStateUpdate','warn','webhookUpdate'];