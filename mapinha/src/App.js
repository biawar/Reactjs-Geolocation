import React from 'react';
import './App.css';
import { Map, GoogleApiWrapper, Marker, DirectionsRenderer, Polyline } from 'google-maps-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css'
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: -8.052240,
      lng: -34.928612,
      name: '',
    }
  }


  onMarkerClick(props, marker, e) {
    console.log('Dentro do onMarkerClick', props, marker, e);
  }

  async teste(res) {
    try {
      console.log('Aqui', res)
      const results = await geocodeByPlaceId(res)
      console.log('geocodeByPlaceid', results)
      const latLng = await getLatLng(results[0]);
      console.log('Aqui', latLng)
      this.setState({ lat: latLng.lat, lng: latLng.lng })
      //   console.log('Successfully got latitude and longitude', { lat, lng }),
      // );
      return latLng;
    } catch (error) {
      console.log('Erro:', error);
    }
    return null;
  }

  render() {
    return (
      <div className="box">
        <div className="containerLateralSide">
          <h1>Digite o local</h1>
          <GooglePlacesAutocomplete
            onSelect={res => this.teste(res.place_id)}
          // onSelect= {this.state.name}
          // onClick={this.teste()}
          />
        </div>

        <div className="boxMap">
          <Map
            google={this.props.google}
            zoom={8}
            className="mapStyles"
            initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
            center={{ lat: this.state.lat, lng: this.state.lng }}
          >
            <Marker position={{ lat: this.state.lat, lng: this.state.lng }}
              onClick={this.onMarkerClick}
              draggable={true}
            // position={bagulho => console.log("OLHA AQUI", bagulho)}
            ></Marker>
          </Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDGMhTRPxrC6m7g3fGDgHozr0SxraMYTDA'
})(App);
