const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/BallotFactory.json');

const provider = new HDWalletProvider(
    **mnuenomic, infura rinkeby testnet**
);
const web3 = new Web3(provider);

const deploy = async () => {
    //gather a list of all the accounts generated by my mnuenomic on the rinkeby network
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy with account: ', accounts[0]);

    //deploy the contract with one of those accounts
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                .deploy({data:'0x'+compiledFactory.bytecode})
                .send({from: accounts[0], gas: '1000000'});
    
    console.log("Contract deployed to: ", result.options.address);
};

deploy();