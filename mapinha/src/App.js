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

  async teste2(res) {
    try {
      console.log('Aqui', res)
      const results = await geocodeByPlaceId(res)
      console.log('geocodeByPlaceid', results)
      const latLng = await getLatLng(results[0]);
      console.log('Aqui', latLng)
      this.setState({ lat2: latLng.lat, lng2: latLng.lng })
      //   console.log('Successfully got latitude and longitude', { lat, lng }),
      // );
      return latLng;
    } catch (error) {
      console.log('Erro:', error);
    }
    return null;
  }


  render() {
    const pathCoordinates = [
      { lat: this.state.lat, lng: this.state.lng },
      { lat: this.state.lat2, lng: this.state.lng2 }
    ];
    return (
      <div className="box">
        <div className="containerLateralSide">
          <h1>Digite o local</h1>
          <GooglePlacesAutocomplete
            onSelect={res => this.teste(res.place_id)}
          // onSelect= {this.state.name}
          // onClick={this.teste()}
          />

          <GooglePlacesAutocomplete
            onSelect={res => this.teste2(res.place_id)}
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
            />
            <Marker position={{ lat: this.state.lat2, lng: this.state.lng2 }}
              onClick={this.onMarkerClick}
              draggable={true}
            />

            <Polyline
              path={pathCoordinates}
              geodesic={true}
              options={{
                strokeColor: "#ff2527",
                strokeOpacity: 0.75,
                strokeWeight: 2,
                // icons: [
                //   {
                //     icon: lineSymbol,
                //     offset: "0",
                //     repeat: "20px"
                //   }
                // ]
              }}
            />
          </Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDGMhTRPxrC6m7g3fGDgHozr0SxraMYTDA'
})(App);