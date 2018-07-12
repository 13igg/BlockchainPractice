pragma solidity ^0.4.21;
//Deployed to Rinkeby at: 
//OLD:::::0x514432C6716Aeb64855Ed93764299b3463C5Eef1
//NEW:::::0x6221CeefA962969c851f7FCF441348Bc01c5EEeE
contract BallotFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimumContribution) public {
        address newCampaign = new Ballot(minimumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Ballot {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;

        mapping(address => bool) approvals;
        uint approvalCount;
    }

    address public manager;
    uint public minimumContribution;

    mapping(address => uint) public approvers;
    uint approversCount;
    
    Request[] public requests;

    constructor(uint minimum, address creator) public{
        manager = creator;
        minimumContribution = minimum;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address){
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager            
        );  
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    function contribute() public payable{
        require(msg.value >= minimumContribution);

        approvers[msg.sender] = msg.value;
        approversCount++;
    }

    function createRequest(string _description, uint _value, address _recipient) public onlyManager {
        requests.push(Request({
            description:_description,
            value: _value,
            recipient: _recipient,
            complete: false,
            approvalCount: 0
        }));
    }

    function approveRequest(uint requestIndex) public{
        Request storage request = requests[requestIndex];

        require(approvers[msg.sender] >= 0);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint requestIndex) public onlyManager{
        Request storage request = requests[requestIndex];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);

        request.complete = true;
    }
}

