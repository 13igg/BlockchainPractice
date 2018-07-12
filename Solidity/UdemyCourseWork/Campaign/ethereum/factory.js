import web3 from './web3';
import CampaignFactory from './build/BallotFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x6221CeefA962969c851f7FCF441348Bc01c5EEeE'
);

export default instance;
