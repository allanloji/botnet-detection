import React from 'react';
import './TableRowLogger.css';
import moment from 'moment'

const TableRowLogger = (result) => {
    let time = moment(result.timestamp).format("DD/MM/YYYY - hh:mm:ss a");

    return(
        <tr>
            <td>{time}</td>
            <td>{result.src_ip}</td>
            <td>{result.dest_ip}</td>
            <td>{result.src_mac}</td>
            <td>{result.dest_mac}</td>
            <td>{result.src_port}</td>
            <td>{result.dest_port}</td>
        </tr>
    );
};






export default TableRowLogger;
