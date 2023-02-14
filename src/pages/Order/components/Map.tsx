import React from "react";

import GoogleMap from 'google-map-react';


import env from "../../../env";
import { IPropMapOrderFinish, IStateMapOrderFinish } from "../../../utils/interface/components/IOrder";


function createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
        zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_BOTTOM,
            style: maps.ZoomControlStyle.SMALL
        },

        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_LEFT
        },

        mapTypeControl: true
    };
}

const Marker = (props) => {
    return (
        <div style={{ background: 'red', width: '8px', height: '8px', borderRadius: '6px' }} ></div>
    )
};

class MapOrderFinish extends React.Component<IPropMapOrderFinish, IStateMapOrderFinish> {
    constructor(props) {
        super(props);

        this.state = {
            center: [12.118751, -86.2091018],
            zoom: 13,
            marker: null
        }

        this.loadUbication = this.loadUbication.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
        this.handleApiLoaded = this.handleApiLoaded.bind(this);
    }


    loadUbication() {
        const onUbicacionConcedida = (ubicacion: GeolocationPosition) => {
            if (!ubicacion?.coords) return;

            this.setState({ marker: { lat: ubicacion.coords.latitude, lng: ubicacion.coords.longitude } });
            this.props.changeValueMarker(this.state.marker);

            
            window.localStorage.setItem(env.localStorage.values.ubication, JSON.stringify({ coords: { latitude: ubicacion.coords.latitude, longitude: ubicacion.coords.longitude } }));
        }
        
        const onErrorDeUbicacion = err => {
            alert("Permiso no valido");
        }
    
        const opcionesDeSolicitud = {
            enableHighAccuracy: true, 
            maximumAge: 0,
            timeout: 5000
        };
    
        if (this.props.lat && this.props.lng) return;
        
        onUbicacionConcedida(JSON.parse(window.localStorage.getItem(env.localStorage.values.ubication)))
        navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
    }

    handlerClick(map) {
        if (this.props.lat && this.props.lng) return;

        this.setState({ marker: { lat: map.lat, lng: map.lng } });
        this.props.changeValueMarker(this.state.marker);
    }


    handleApiLoaded() {
        setTimeout(() => {
            this.loadUbication();
        }, 2000)
    }

    render(): React.ReactNode {
        return (
            <main className="maps">
                <GoogleMap
                    center={this.state.center}
                    zoom={this.state.zoom}
                    bootstrapURLKeys={{ key: env.API_MAPS_KEY }}
                    options={createMapOptions}
    
                    onClick={this.handlerClick}
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded()}
                    yesIWantToUseGoogleMapApiInternals={true}
                >
                    <Marker lat={this.state.marker?.lat || this.props.lat} lng={this.state.marker?.lng || this.props.lng} />
                </GoogleMap>
            </main>
        )
    }
}


export default MapOrderFinish;

