import React, { Component } from 'react';
import './Log.css';
import TableRow from "../TableRow/TableRow";
import Fire from '../Fire/index';


class Log extends Component {

    constructor(props) {
        super(props);
        this.state = {email: "example@pe.com", password: "password"};
        this.state = { messages: [] };
        //app.initializeApp(config);
        //this.db = app.database();
        //app.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
    }

    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let messagesRef = Fire.database().ref('test_data');
        messagesRef.limitToLast(3).on('child_added', snapshot => {
            //console.log(snapshot.val());
            /* Update React state when message is added at Firebase Database */
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
            <div className="row log">
                <table className="table">
                    <thead>
                    <tr>
                        <th>IP</th>
                        <th>Ciudad/País</th>
                        <th>Organización</th>
                        <th>Región</th>
                        <th>Razón</th>
                        <th>Contador</th>
                        <th>Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.messages.map((result, i) =>
                            <TableRow key={i} {...result}/>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Log;