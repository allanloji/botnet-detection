import React from 'react';
import './TableRow.css';
import moment from "moment";


const TableRow = (result) => {
    let time = moment(result.timestamp).format("DD/MM/YYYY - hh:mm:ss a");

    let city, country, organization, regionName = "";
    if(result.infoIp === "NO_INFO"){
        city = "No Info";
        country = "No Info";
        organization = "No Info";
        regionName = "No Info";
    }else{
        city = result.infoIp.city;
        country = result.infoIp.country;
        organization = result.infoIp.organization;
        regionName = result.infoIp.regionName;
    }
    if(result.ip !== "127.0.0.1"){
        return(

            <tr>
                <td>{result.ip}</td>
                <td>
                    {city}, {country}
                </td>
                <td>{organization}</td>
                <td>{regionName}</td>
                <td>
                    {
                        result.reasons.map(r =>
                            (
                                <p>{r.reason}</p>
                            )
                        )
                    }
                </td>
                <td>
                    {
                        result.reasons.map(r =>
                            (
                                <p>{r.count}</p>
                            )
                        )
                    }
                </td>
                <td>{time}</td>
            </tr>
        );
    }else{
        return("");
    }
};






export default TableRow;
