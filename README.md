# Introduction
This repo contains code produced from multiple tutorials, online courses, and walkthroughs. Nothing within this repo is original, this is just sourcing my travels through the blockchain; from representing the bare minimums of a blockchain with a python array to recognizing and exploiting security holes in ethereum contracts, this repo has it all.

# Python
### My First Blockchain
Tutorial Link : https://hackernoon.com/learn-blockchains-by-building-one-117428612f46

Created a trivial private Python blockchain complete with the ability to mine new blocks, consensus transaction control, and api endpoint mappings via Flask. 

#PrivateEthereumBlockchain
Private ethereum blockchain created using the geth commandline. View the readme within that project for more information. 

# Solidity
### Udemy Course Work
Course 1 - Ethereum and Solidity: The Complete Developer's Guide

https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/overview

Created multiple solidity and react applications. More info below.


Course 2 - Pass the Certified Blockchain Developer Exam - ETHEREUM

https://www.udemy.com/ethereum-blockchain-certification/learn/v4/overview

Covered basics of the blockchain all the way to more complex topic such as security, consensus algorithms, and then finally coding in solidity. (currently 25%+ through this course)

### Applications:
#### inbox
Covered basics of solidity such as prototyping in Remix, Compiling with solc, interacting with web3 and deploying to test nodes with truffle. 

#### lottery
A manager would start a lottery, other people would contribute ether to the contract, and then when the manager closes the lotto, a random player would win the contract's balance. 

Covered random numbers in solidity and how contracts can be manipulated by troublesome addresses. Deployed to the rinkeby chain via truffle and infura.

Bootstrapped a react app with Create React App to interact with the contract via web3 and metamask.

#### campaign
The largest by far of the demo applications. This covered creating a full fledged DAPP similar to Kickstarter. Managers send a request to a contract with a minimum contribution amount which would inturn create a campaign contract. Users contribute to the campaign and then the campaign manager is able to create spending requests which the contributers would have to approve. It's a mouthful, but think Kickstarter and it will make sense. 

Using one contract to manage and create multiple children contracts. 

A full blown next.js server side rendering react app with dynamic routing to interact with the campaign contract 


# CryptoZombies
Link - https://cryptozombies.io/

Tutorial going through the stages of creating a solidity contract and interacting with external DAPPS. Featured creating an ERC721 token creation, standards, and conforming to public interfaces, such as those found on OpenZeppelin.com.

# ZEthernaut CTF 
Link - https://ethernaut.zeppelin.solutions/level/0x234094aac85628444a82dae0396c680974260be7

First bit of work I did on my own. Analyzing contracts and finding weaknesses in them. I am not posting the contracts/code for this one, but describing below the fault in the contracts and what I did to exploit them. 

#### Fallback -- Functions are a thing
Claimed ownership of the contract by calling the fallback function(backup if no valid method is called)

#### Fallout -- Constructor naming!!
The constructor name is spelled differently than the contract itself. This is why later versions of solidity enforce using 'constructor()' as the constructor. 

#### Coin Flip -- Random numbers!!
Noticed the random function is based on the current block number. Exploited this one by creating my own contract that would check which block it was currently being mined on, and then call the flip method with a valid heads/tails. Doing this 10 times(10 different blocks) successfully gave me 10 correct 'guesses'

#### Telephone -- tx.origin vs msg.sendert
Differences of tx.origin and msg.sender - If you call a contract, then have the contract call the telephone app, origin and sender will be different. 

#### Token -- USE OpenZeppelin's SafeMath library
Maths is fun in solidity. Need to be careful using uints b/c of overflows. Overflowed my balance to the max!

#### Delegation -- delegatecall
call the pwn via the delegate call in the fallback method. By passing pwn as the data, this became the call to the Delegate contract

#### Force -- suicide / selfdestruct
Selfdestruct a contract over to this empty force contract. selfdesctruct cannot be stopped!

#### Vault -- Private variables are not so private
web3.eth.getStorageAt(address,1)
Get the password from storage and send that through!

#### King -- transfer w/ no additional information
since we are calling king.transfer back to a contract w/ no data, it will call the fallback of that contract. Lets have a contract call the King game w/o a fallback so that it gets stuck sending the funds!

#### Elevator -- calling another contract can have negative effects!
Since the elevator contract is calling out to the building contract, we can have the isLastFloor modify some state. First time it is called have it return false, after that, have it return true! We don't even need to care about the input parameters here :)

