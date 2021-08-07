import React from 'react';
import './Result.css';



class Result extends React.Component {
    render() {
        return (
            <div className="Result">
                <h2>{this.props.result.show}</h2>
                <div className="Result-information">
                    <div className="Result-details">
                        {
                            this.props.result.ticketInfo.map(ticket => {
                                return <p>
                                    <p className="ticketType">Ticket: {ticket.type}</p>
                                    <p>Price: {ticket.price}</p>
                                    <p>Count: {ticket.count}</p>
                                    <p>Total: {ticket.total}</p>
                                </p>
                            })
                        }

                    </div>
                    <div className="Result-zip">
                        <h3>Zip Report</h3>
                        <h3 className="rating">
                            {
                                this.props.result.zipInfo.map(zip => {
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
export default Result;
