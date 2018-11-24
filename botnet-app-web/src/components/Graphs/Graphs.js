import React, { Component } from 'react';
import './Graphs.css';
import Fire from "../Fire";
import { Bar } from "react-chartjs-2";

class Graphs extends Component {

    constructor(props) {
        super(props);
        this.state = {email: "example@pe.com", password: "password"};
        this.state = { messages: [] };
    }

    componentWillMount(){
        let messagesRef = Fire.database().ref('test_data');
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
        let registers = this.state.messages;
        let ipCount = 0;
        let portCount = 0;
        let errCount = 0;
        let mulConCount = 0;
        registers.forEach(reg => {
            reg.reasons.forEach(r =>{
                if(reg.ip !== "127.0.0.1"){
                    switch (r.reason) {
                        case 'BAD_IP':
                            ipCount+=r.count;
                            break;
                        case 'BAD_PORT':
                            portCount+=r.count;
                            break;
                        case 'ERR':
                            errCount+=r.count;
                            break;
                        case 'MUL_CON':
                            mulConCount+=r.count;
                    }
                }
            });
        });
        let chartData = {
            labels:["Tipos de Amenazas"],
            datasets:[
                {
                    label:'BAD_IP',
                    data:[
                        ipCount
                    ],
                    backgroundColor:[
                        'rgba(255,99,132,0.6)'
                    ]
                },
                {
                    label:'BAD_PORT',
                    data:[
                        portCount
                    ],
                    backgroundColor:[
                        'rgba(54,162,235,0.6)'
                    ]
                },
                {
                    label:'ERR',
                    data:[
                        errCount
                    ],
                    backgroundColor:[
                        'rgba(255,206,86,0.6)'
                    ]
                },
                {
                    label:'MUL_CON',
                    data:[
                        mulConCount
                    ],
                    backgroundColor:[
                        'rgba(157,215,42,0.6)'
                    ]
                }
            ]
        };
        return (
            <div className="col-sm-12 chart-container">
                <div className="chart">
                    <Bar
                        data={chartData}
                        height={400}
                        options={{
                            title:{
                                display:true,
                                text:"Amenazas Potenciales",
                                fontsize:40
                            },
                            legend:{
                                display:true,
                                position:'bottom'
                            },
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            </div>
        );
    }

}

export default Graphs;
