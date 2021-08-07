import React from 'react';
import './TicketInfo.css';



class TicketInfo extends React.Component {
    render() {
        return (
            <div className="Summaries">
                <h1>{this.props.business.name}</h1>
                <h4><span style={{ color: "#c9b92f" }}>Number of shows purchased tickets for: </span>{this.props.business.shows}</h4>
                <h4><span style={{ color: "#c9b92f" }}>Number of different phone numbers used:  </span>{this.props.business.phones}</h4>
                <h4><span style={{ color: "#c9b92f" }}>Number of different email addresses used:  </span>{this.props.business.emails}</h4>
                <h4><span style={{ color: "#c9b92f" }}>Number of shows with 0 scanned tickets for purchased shows: </span>{this.props.business.noShows}</h4>
                <p></p>
                <p></p>
                {
                    this.props.business.show.map(entry => {
                        return <div className="Business1">
                            <div className="Business-information1">
                                <div className="Business-address1">
                                    <p><span style={{ color: "#c9b92f" }}>Name: </span>{entry.name}</p>
                                    <p><span style={{ color: "#c9b92f" }}>Show: </span>{entry.show}</p>
                                    <p><span style={{ color: "#c9b92f" }}>Date: </span>{entry.date}</p>
                                    <p><span style={{ color: "#c9b92f" }}>Ticket: </span>{entry.tixtype}</p>
                                    <p><span style={{ color: "#c9b92f" }}>Bought: </span>{entry.bought}</p>
                                    <p><span style={{ color: "#c9b92f" }}>Scanned: </span>{entry.scanned}</p>
                                    <p><span style={{ color: "#c9b92f" }}>Phone Number: </span>{entry.phone}</p>
                                    <p><span style={{ color: "#c9b92f" }}>Email: </span>{entry.email}</p>
                                    <p><span style={{ color: "#c9b92f" }}>Order Number: </span>{entry.ordernumber}</p>
                                </div>
                            </div>
                        </div>
                    })

                }
            </div>
        )
    }
};
export default TicketInfo;