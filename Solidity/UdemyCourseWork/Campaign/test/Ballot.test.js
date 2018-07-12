const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require ('../ethereum/build/BallotFactory.json');
const compiledCampaign = require('../ethereum/build/Ballot.json');

let accounts;
let factory;

let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    //Add factory abi
    factory = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
        ) 
        .deploy({data: compiledFactory.bytecode})
        .send({from: accounts[0], gas: '1000000'});

    //create the campaign
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    //take the first piece of teh right side and put it into campaignAddress
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        let manager = await campaign.methods.manager().call();

        assert.equal(accounts[0], manager);
    });

    it('allows people to contribut money and marks them as approvers' , async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '200'
        });

        const contributerValue = await campaign.methods.approvers(accounts[1]).call();        

        assert(contributerValue > 0);
    });

    it('requires a minimum contribution', async () => {
        try{
            await campaign.methods.contribute().send({
                value : '5',
                from: accounts[1]
            });
            assert(false);
        } catch(err) {
            assert(err);
        }
    });

    it('manager can create a new request', async () => {
        await campaign.methods.createRequest('buy batteries', 100, accounts[1]).send({
            from:accounts[0],
            gas: '1000000'
        });

        const request = await campaign.methods.requests(0).call();

        assert.equal('buy batteries', request.description);
    });

    //full test
    it('processes request', async () => {
        await campaign.methods.contribute().send({
            from: accounts[3],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods.createRequest('buy batteries', web3.utils.toWei('5','ether'), accounts[1]).send({
            from: accounts[0],
            gas: '1000000'                
        });

        await campaign.methods.approveRequest(0).send({
                from: accounts[3],
                gas: '1000000'
            });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        //usign let to reassign balance
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        console.log(balance);
        assert(balance > 104);
    });
})