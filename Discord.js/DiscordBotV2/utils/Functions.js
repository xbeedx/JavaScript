const { twitterHandler } = require('../models/index.js');
const { startStream,deleteAllRules } = require('../twitterClient.js');


module.exports = async client => {
    client.getHandler = async handler => {
        const handlerData = await twitterHandler.findOne({value: handler})
        return handlerData
    }

    client.createHandler = async (handler,channelId) => {
        const createHandler = new twitterHandler({value: handler, channel: channelId});
        createHandler.save().then(h => console.log(`New Handler tracked (`,h.value,`)`));
        const result = await startStream(client);
        return result
    }

    client.updateHandler = async (handler,settings) => {
        let handlerData = await client.getHandler(handler) 
        if( typeof handlerData != 'object') handlerData = {}
        for(const key in settings){
            if(handlerData[key] != settings[key]) handlerData[key] != settings[key]
        }
        return handlerData.updateOne(settings)
    }

    client.removeHandler = async handler => {
        const handlerData = await twitterHandler.deleteOne({value: handler})
        return handlerData
    }

    client.getAllHandlers = async () => {
        const handlerData = await twitterHandler.find()
        console.log(handlerData)
        return handlerData
    }

    client.removeAllHandlers = async () => {
        await twitterHandler.deleteMany()
        const result = await deleteAllRules()
        if (!(result instanceof Error)) {
            return "track emptied";
        }
        return result
    }
}