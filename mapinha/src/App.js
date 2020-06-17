import React from 'react';
import './App.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
//import axios from 'axios';

class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
        lat: -8.052240,
        lng: -34.928612,
        name: ''
    }
  }

 

  // componentDidMount() {
  //   geocodeByAddress('Mohali, Punjab')
  //     .then(results => getLatLng(results[0]))
  //     .then(({ lat, lng }) =>
  //       console.log('Successfully got latitude and longitude', { lat, lng })
  //     );
  // }

  teste() {
    geocodeByAddress('Mohali, Punjab')
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        console.log('Successfully got latitude and longitude', { lat, lng }),
        // this.setState({
        //   lat: lat,
        //   lng: lng,
        // })
      );
  }

  render() {
    return (
      <div className="box">
        <div className="containerLateralSide">
          <h1>Digite o local</h1>
          {(typeof this.state.name !== undefined) &&
          <GooglePlacesAutocomplete
            onSelect={({ description }) => (
              this.setState({ name: description }))
            }

            
          // onSelect= {this.state.name}
          // onClick={this.teste()}
          />}
        </div>

        <div className="boxMap">
          <Map
            google={this.props.google}
            zoom={8}
            className="mapStyles"
            initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
          >
            <Marker position={{ lat: -8.052240, lng: -34.928612 }} onClick={() => console.log("You clicked me!")} />
          </Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDGMhTRPxrC6m7g3fGDgHozr0SxraMYTDA'
})(App);
