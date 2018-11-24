import React, { Component } from 'react';
import './Home.css';
import Log from "../Log/index";
import Logger from "../Logger/index";
import Graphs from "../Graphs/index";
import Map from '../Map/index';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Hola',
            center: '',
            results: []
        };
    }
    // <Graphs/>
    // <Map/>

    render(){
        return (
            <div className="container-fluid container-fluid-spacious">
                <div className="col-sm-10 col-sm-offset-1">
                    <div className="hr-divider m-t m-b-md">
                        <h3 className="hr-divider-content hr-divider-heading">Posibles Amenazas</h3>
                    </div>
                    <Log/>
                </div>
                <div className="col-sm-12">
                    <div className="hr-divider m-t m-b-md">
                        <h3 className="hr-divider-content hr-divider-heading">Información General</h3>
                    </div>
                    <div className="visual-container">
                      <div className="left-visual-container">
                        <Graphs/>
                      </div>
                      <div className="right-visual-container">
                        <Map center={this.state.center} results={this.state.results}/>
                      </div>
                    </div>
                </div>
                <div className="col-sm-10 col-sm-offset-1 logger">
                    <div className="hr-divider m-t m-b-md">
                        <h3 className="hr-divider-content hr-divider-heading">Logger</h3>
                    </div>
                    <Logger/>
                </div>
            </div>
        );
    }
}

export default Home;
