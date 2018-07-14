I plan on eventually adding the actual solutions to this repo, but as I solved them all in Remix, I didn't keep any of them. 

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
