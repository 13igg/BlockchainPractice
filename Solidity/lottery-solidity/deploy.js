const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    ***mnuenomic, rinkeby test net***
);
const web3 = new Web3(provider);

const deploy = async () => {
    //gather a list of all the accounts generated by my mnuenomic on the rinkeby network
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy with account: ', accounts[0]);

    //deploy the contract with one of those accounts
    const lottery = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({data:'0x'+bytecode})
                .send({from: accounts[0], gas: '1000000'});
    
    console.log("Contract deployed to: ", lottery.options.address);
};

deploy();