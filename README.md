# Introduction
This repo contains code produced from multiple tutorials, online courses, and walkthroughs. Nothing within this repo is original, this is just sourcing my travels through the blockchain; from representing the bare minimums of a blockchain with a python array to recognizing and exploiting security holes in ethereum contracts, this repo has it all.

# Python
##My First Blockchain
Tutorial Link : https://hackernoon.com/learn-blockchains-by-building-one-117428612f46
Created a trivial private Python blockchain complete with the ability to mine new blocks, consensus transaction control, and api endpoint mappings via Flask. 

# Solidity
##Udemy Course Work
Ethereum and Solidity: The Complete Developer's Guide
https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/overview
Created multiple solidity and react applications. More info below.

Pass the Certified Blockchain Developer Exam - ETHEREUM
https://www.udemy.com/ethereum-blockchain-certification/learn/v4/overview
Covered basics of the blockchain all the way to more complex topic such as security, consensus algorithms, and then finally coding in solidity. (currently 25%+ through this course)

###Applications:
####inbox
Covered basics of solidity such as prototyping in Remix, Compiling with solc, interacting with web3 and deploying to test nodes with truffle. 

####lottery
A manager would start a lottery, other people would contribute ether to the contract, and then when the manager closes the lotto, a random player would win the contract's balance. 
Covered random numbers in solidity and how contracts can be manipulated by troublesome addresses. Deployed to the rinkeby chain via truffle and infura. 
Bootstrapped a react app with Create React App to interact with the contract via web3 and metamask. 

####campaign
The largest by far of the demo applications. This covered creating a full fledged DAPP similar to Kickstarter. Managers send a request to a contract with a minimum contribution amount which would inturn create a campaign contract. Users contribute to the campaign and then the campaign manager is able to create spending requests which the contributers would have to approve. It's a mouthful, but think Kickstarter and it will make sense. 
Using one contract to manage and create multiple children contracts. 
A full blown next.js server side rendering react app with dynamic routing to interact with the campaign contract 


#Zeppelin CTF 
First bit of work I did on my own. Analyzing contracts and finding weaknesses in them. 
