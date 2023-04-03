const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async Oni => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile => {
        const cmd = require(cmdFile);

        //Stop if no name or description 
        if(!cmd.name || !cmd.description) return console.log(`-----\ cmd not loaded: no name and/or description \n -> File: ${cmdFile}\n-----`);

        Oni.commands.set(cmd.name,cmd);
        console.log(`Command loaded : ${cmd.name} `);
    });
}