const needle = require('needle');
const token = process.env.TWITTER_BEARER_TOKEN;
const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream';

const rules = [{
        'value': 'from:visionofviii',
        'tag': 'viii'
    },{
        'value': 'from:CValley_',
        'tag': 'CV'
    },{
        'value': 'from:ether',
        'tag': 'Ether'
    },{
        'value': 'from:roh99002',
        'tag': 'ro'
    },{
        'value': 'from:Amor2144142731',
        'tag': 'Amor'
    },
];

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

async function deleteAllRules(rules) {
    if (!Array.isArray(rules.data)) {
        return null;
    }
    const ids = rules.data.map(rule => rule.id);
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

async function setRules() {
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
    return (response.body);

}

function streamConnect(retryAttempt,client) {
    console.log("Connection to Twitter")
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
            console.log(json);
            console.log("SENDING TO DISCORD");
            const logChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
            logChannel.send("https://twitter.com/" + json.matching_rules[0].tag + "/status/" + json.data.id);
            retryAttempt = 0;
        } catch (e) {
            if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
                console.log(data.detail)
                process.exit(1)
            } else {
            }
        }
    }).on('err', error => {
        if (error.code !== 'ECONNRESET') {
            console.log(error.code);
            process.exit(1);
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
    let currentRules;
    try {
        currentRules = await getAllRules();
        await deleteAllRules(currentRules);
        await setRules();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
    streamConnect(0,client);
};


module.exports = { startStream };