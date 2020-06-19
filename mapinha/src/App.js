/* global google */
import React from 'react';
import './App.css';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css'
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: -8.052240,
      lng: -34.928612,
      lat2: '',
      lng2: '',
      lat3: '',
      lng3: '',
      name: '',
      route: [],
      route2: [],
      route3: [],
    }
  }

  calculateDistance = () => {
    const { google } = this.props;
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: new google.maps.LatLng(this.state.lat, this.state.lng),
      destination: new google.maps.LatLng(this.state.lat2, this.state.lng2),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      console.log('OLHA QUEM EH RESULT', result, status);
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          route: result.routes[0].overview_path.map(p => { return { lat: p.lat(), lng: p.lng() } })
        });
      } else {
        console.error(`error fetching directions ${result}`);
        console.log('DEU MERDA', result)
      }
    });

  }

  calculateDistance2 = () => {
    const { google } = this.props;
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: new google.maps.LatLng(this.state.lat2, this.state.lng2),
      destination: new google.maps.LatLng(this.state.lat3, this.state.lng3),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      console.log('OLHA QUEM EH RESULT', result, status);
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          route2: result.routes[0].overview_path.map(p => { return { lat: p.lat(), lng: p.lng() } })
        });
      } else {
        console.error(`error fetching directions ${result}`);
        console.log('DEU MERDA', result)
      }
    });

  }

  calcInitFinal = () => {
    const { google } = this.props;
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: new google.maps.LatLng(this.state.lat, this.state.lng),
      destination: new google.maps.LatLng(this.state.lat3, this.state.lng3),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      console.log('OLHA QUEM EH RESULT', result, status);
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          route3: result.routes[0].overview_path.map(p => { return { lat: p.lat(), lng: p.lng() } })
        });
      } else {
        console.error(`error fetching directions ${result}`);
        console.log('DEU MERDA', result)
      }
    });

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

  async teste3(res) {
    try {
      console.log('Aqui', res)
      const results = await geocodeByPlaceId(res)
      console.log('geocodeByPlaceid', results)
      const latLng = await getLatLng(results[0]);
      console.log('Aqui', latLng)
      this.setState({ lat3: latLng.lat, lng3: latLng.lng })
      //   console.log('Successfully got latitude and longitude', { lat, lng }),
      // );
      return latLng;
    } catch (error) {
      console.log('Erro:', error);
    }
    return null;
  }

  // async teste4(res) {
  //   try {
  //     console.log('Aqui', res)
  //     const results = await geocodeByPlaceId(res)
  //     console.log('geocodeByPlaceid', results)
  //     const latLng = await getLatLng(results[0]);
  //     console.log('Aqui', latLng)
  //     this.setState({ lat4: latLng.lat, lng4: latLng.lng })
  //     //   console.log('Successfully got latitude and longitude', { lat, lng }),
  //     // );
  //     return latLng;
  //   } catch (error) {
  //     console.log('Erro:', error);
  //   }
  //   return null;
  // }

  render() {
    const pathCoordinates = [
      { lat: this.state.lat, lng: this.state.lng },
      { lat: this.state.lat2, lng: this.state.lng2 }
    ];
    return (
      <div className="box">

        <div className="containerLateralSide">
          <h1>Digite os locais</h1>
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
          <GooglePlacesAutocomplete
            onSelect={res => this.teste3(res.place_id)}
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
            onReady={() => this.state.lat2 != undefined ? this.calculateDistance() : null}
          >
            <Marker position={{ lat: this.state.lat, lng: this.state.lng }}
              onClick={this.onMarkerClick}
              draggable={true}
            />
            <Marker position={{ lat: this.state.lat2, lng: this.state.lng2 }}
              onClick={this.onMarkerClick}
              draggable={true}
            />
            <Marker position={{ lat: this.state.lat3, lng: this.state.lng3 }}
              onClick={this.onMarkerClick}
              draggable={true}
            />
            {/* <Marker position={{ lat: this.state.lat4, lng: this.state.lng4 }}
              onClick={this.onMarkerClick}
              draggable={true}
            /> */}


            {this.calculateDistance()}
            {this.state.lng2 &&
              <Polyline
                path={this.state.route}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={3} />
            }

            {this.calculateDistance2()}
            {this.state.lng3 &&
              <Polyline
                path={this.state.route2}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={3} />
            }

            {this.calcInitFinal()}
            {this.state.route3 &&
              <Polyline
                path={this.state.route3}
                strokeColor="#ff0066"
                strokeOpacity={0.8}
                strokeWeight={5} />
            }

          </Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDGMhTRPxrC6m7g3fGDgHozr0SxraMYTDA'
})(App);