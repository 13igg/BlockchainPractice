import Web3 from 'web3';

//const web3 = new Web3(window.web3.currentProvider);
let web3; //Let allows us to reassign the variable

//typeof lets us know if it is defined or not
if(typeof window != 'undefined' && typeof window.web3 != 'undefined') {
    //we are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
}else{
    //we are on the server or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/moQgPNMEUGpYXdFBDELZ'
    );

    web3 = new Web3(provider);
}

export default web3;