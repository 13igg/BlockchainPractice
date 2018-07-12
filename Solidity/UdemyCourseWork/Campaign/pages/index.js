import React, {Component} from 'react';
import factory from '../ethereum/factory';
import {Card, Button} from 'semantic-ui-react'
import Layout from '../components/Layout'
import {Link} from '../routes';

//Functional
// export default () => {
//     return <h1>Welcome to the root page</h1>;
// }

//classbased
class CampaignIndex extends Component{
    //THIS IS PURELY NEXT --static is class function
    static async getInitialProps(){        
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        
        return {campaigns}
    }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>,
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    render(){
       return(
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>

                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                content='Create Campaign'
                                icon='add circle'
                                primary
                                floated = "right"
                            ></Button>
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
       );
    }
}

export default CampaignIndex