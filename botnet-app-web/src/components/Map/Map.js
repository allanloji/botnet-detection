import React, { Component } from 'react';
import './Map.css';
import PropTypes from "prop-types";
import Fire from '../Fire/index';

class Map extends Component {

    placeMarker(location, title, isCurrentLocation) {
      const google = window.google;
      let marker = new google.maps.Marker({
        position: location,
        title: title,
        map: this.map,
      });
      this.state.markers.push(marker)
      let newLocation = {lat: location.lat, lng: location.lng}
      let infowindow = new google.maps.InfoWindow({
        content: title,
        position: newLocation,
        pixelOffset: new google.maps.Size(-1.5, -40),
      });
      if (isCurrentLocation === true) {
        infowindow.open(this.map);
      }
      google.maps.event.addListener(marker , 'click', function(){
        infowindow.open(this.map);
      });
    }

    constructor(props) {
      super(props)
      this.placeMarker = this.placeMarker.bind(this)
      this.clearMarkers = this.clearMarkers.bind(this)
      this.placeMarkers = this.placeMarkers.bind(this)
      this.state = {results: props.results, markers: []}
    }

    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let messagesRef = Fire.database().ref('test_data').limitToLast(100);
        messagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            const message = snapshot.val();
            this.setState({ results: [message].concat(this.state.results) });
            //console.log(this.state.results)
        });
    }

    componentDidMount() {
      const google = window.google;
      let center = {
        lat: 45,
        lng: 0,
      }
      this.map = new google.maps.Map(this.refs.map, {
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        center: center,
        zoom: 1.5
      });
    }

    render() {
        this.clearMarkers()
        this.placeMarkers()
        return (
          <div ref="map" className="map"></div>
        );
    }

    placeMarkers() {
      let results = this.state.results
      //console.log(results.length)
      for(let i = 0; i < results.length; i++) {
        let coordinates = {
          lat: results[i].lat,
          lng: results[i].lon
        };
        this.placeMarker(coordinates, results[i].name, false)
      }
    }

    clearMarkers(map) {
      let markers = this.state.markers
      for(let i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
    }
}

Map.defaultProps = {
    title: "Título"
};

Map.propTypes = {
    title: PropTypes.string.isRequired
};

export default Map;
