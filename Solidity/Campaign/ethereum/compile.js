const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//delete/recreate entire build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Ballot.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, contract.substring(1) + '.json'),
        output[contract]
    );
}