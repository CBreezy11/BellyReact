import React from 'react';
import './ResultList.css';
import Result from '../Business/Result';
import TicketInfo from '../TicketInfo/TicketInfo';

class ResultList extends React.Component {
    display(result) {
        if (this.props.results.sortby === 'show_data') {
            return <Result result={result} key={result.id} />
        } else {
            return <TicketInfo result={result} key={result.id} />
        }
    }

    render() {
        return (
            <div className="ResultList" >
                {
                    this.props.results.results.map(result => {
                        return this.display(result)
                    })
                }
            </div>

        )
    }
}
export default ResultList;
