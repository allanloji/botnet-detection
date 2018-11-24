import React, { Component } from 'react';
import './Logger.css';
import TableRowLogger from "../TableRowLogger/index";
import Fire from '../Fire/index';


class Logger extends Component {

    constructor(props) {
        super(props);
        this.state = {email: "example@pe.com", password: "password"};
        this.state = { messages: [] };
    }

    componentWillMount(){
        let messagesRef = Fire.database().ref('log');
        messagesRef.limitToLast(3).on('child_added', snapshot => {
            //console.log(snapshot.val());
            const message = snapshot.val();
            if(this.state.messages.length > 100){
                this.setState({ messages: [message].concat(this.state.messages.pop()) });
            }else{
                this.setState({ messages: [message].concat(this.state.messages) });
            }
        });

    }


    render(){

        return (
            <div className="row logger">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>IP origen</th>
                        <th>IP destino</th>
                        <th>MAC origen</th>
                        <th>MAC destino</th>
                        <th>Puerto origen</th>
                        <th>Puerto destino</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.messages.map((result, i) =>
                        <TableRowLogger key={i} {...result}/>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Logger;