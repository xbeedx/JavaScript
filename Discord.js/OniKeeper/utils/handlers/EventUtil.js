const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async Oni => {
    (await pGlob(`${process.cwd()}/events/*/*.js`)).map(async eventFile => {

        //process.cwd() : /*/*/*/OniKeeper
        //eventFile) : /*/*/*/OniKeeper/events/client/ready.js

        const event = require(eventFile);

        if(event.once){
            //Oni.once('ready',()=> 
            Oni.once(event.name, (...args) => event.execute(Oni, ...args));
        } else {
            Oni.on(event.name, (...args) => event.execute(Oni, ...args));
        }
    });
}