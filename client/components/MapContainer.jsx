import React from 'react'
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

class MapContainer extends React.Component {
  render() {
    return (
      <Map
        center={[21.027763, 105.834160]}
        zoom={12}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[50, 10]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
        <Circle 
          center={{lat:21.027763, lng:105.834160}}
          fillColor="blue" 
          radius={1200}/>
        <Circle 
          center={{lat:21.017650, lng:105.783963}}
          fillColor="red" 
          radius={1000}/>
      </Map>
    );
  }
}

export default MapContainer;