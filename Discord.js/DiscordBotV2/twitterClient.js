const needle = require('needle');
const token = process.env.TWITTER_BEARER_TOKEN;
const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream';
var str = ''

var rules = [];

async function getAllRules() {
    const response = await needle('get', rulesURL, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    if (response.statusCode !== 200) {
        console.log("Error:", response.statusMessage, response.statusCode)
        throw new Error(response.body);
    }
    return (response.body);
}

async function deleteAllRules() {
    let currentRules = await getAllRules();
    if (!Array.isArray(currentRules.data)) {
        return null;
    }
    const ids = currentRules.data.map(rule => rule.id);
    const data = {
        "delete": {
            "ids": ids
        }
    }
    const response = await needle('post', rulesURL, data, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    if (response.statusCode !== 200) {
        throw new Error(response.body);
    }
    return (response.body);

}

async function setRules(client) {
    const handlers = await client.getAllHandlers()
    rules = handlers.map((item) => {
        return {
          value: `from:${item.value}`,
          tag: item.value,
          channel : item.channel
        };
      });

    const data = {
        "add": rules
    }
    const response = await needle('post', rulesURL, data, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    if (response.statusCode !== 201) {
        throw new Error(response.body);
    }
    str = "Listening to: ";
    rules.forEach(rule => str += rule.tag+" on channel <#"+rule.channel+"> \n");
    console.log(str)
    return (response.body);

}

function streamConnect(retryAttempt,client) {
    const stream = needle.get(streamURL, {
        headers: {
            "User-Agent": "v2FilterStreamJS",
            "Authorization": `Bearer ${token}`
        },
        timeout: 20000
    });

    stream.on('data', data => {
        try {
            const json = JSON.parse(data);
            console.log(json)
            const logChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
            logChannel.send("https://twitter.com/" + json.matching_rules[0].tag + "/status/" + json.data.id);
            retryAttempt = 0;
        } catch (e) {
            if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
                console.log(data.detail)
                return "This stream is currently at the maximum allowed connection limit."
            } else {
            }
        }
    }).on('err', error => {
        if (error.code !== 'ECONNRESET') {
            console.log(error.code);
        } else {
            setTimeout(() => {
                console.warn("A connection error occurred. Reconnecting...")
                streamConnect(++retryAttempt,client);
            }, 2 ** retryAttempt)
        }
    });
    return stream;
}

async function startStream(client) {
    try {
        await deleteAllRules();
        await setRules(client);
    } catch (e) {
        console.error(e);
        return "An error occurred while starting the Twitter stream."
    }
    streamConnect(0,client);
    return "Stream connected \n"+str
};


module.exports = { startStream,deleteAllRules };