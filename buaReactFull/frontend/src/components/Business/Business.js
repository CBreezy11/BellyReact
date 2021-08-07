import React from 'react';
import './Business.css';



class Business extends React.Component {
    render() {
        return (
            <div className="Business">
                <h2>{this.props.business.show}</h2>
                <div className="Business-information">
                    <div className="Business-address">
                        {
                            this.props.business.ticketInfo.map(ticket => {
                                return <p>
                                    <p className="ticketType">Ticket: {ticket.type}</p>
                                    <p>Price: {ticket.price}</p>
                                    <p>Count: {ticket.count}</p>
                                    <p>Total: {ticket.total}</p>
                                </p>
                            })
                        }

                    </div>
                    <div className="Business-reviews">
                        <h3>Zip Report</h3>
                        <h3 className="rating">
                            {
                                this.props.business.zipInfo.map(zip => {
                                    return <p>
                                        <p className="ticketType">{zip.location}</p>
                                        <p>Count: {zip.quantity}</p>
                                        <p>Percentage: {zip.percentage}</p>
                                    </p>
                                })
                            }
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
};
export default Business;