import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';
import TicketInfo from '../TicketInfo/TicketInfo';

class BusinessList extends React.Component {
    display(business) {
        if (this.props.businesses.sortby === 'show_data') {
            return <Business business={business} key={business.id} />
        } else {
            return <TicketInfo business={business} key={business.id} />
        }
    }

    render() {
        return (
            <div className="BusinessList" >
                {
                    this.props.businesses.businesses.map(business => {
                        return this.display(business)
                    })
                }
            </div>

        )
    }
}
export default BusinessList;
