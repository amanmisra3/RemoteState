import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './MapView.css'
import redMarker from '../../images/truck-2047_red.png'
import greenMarker from '../../images/truck-2047_green.png'
import yellowMarker from '../../images/truck-2047_yellow.png'
import blueMarker from '../../images/truck-2047_blue.png'


function MapView(props) {

    //markers
    const [markerIcon, setMarkerIcon] = useState(redMarker)
    const [param, setParam] = useState('')

    useEffect(() => {
        setParam(props.truckStatusText)
    }, [props])

    useEffect(() => {
        let updateMarker = function(){
            if(param === 'total'){
                setMarkerIcon(redMarker)
            }
            else if(param === 'running'){
               setMarkerIcon(greenMarker)
           }
           else if(param === 'stopped'){
               setMarkerIcon(blueMarker)
           }
           else if(param === 'idle'){
               setMarkerIcon(yellowMarker)
           }
           else if(param === 'error'){
               setMarkerIcon(redMarker)
           }
       }
        updateMarker()
    }, [props])

    //GoogleMap code
    const [currentPosition] = useState({ lat: 30.9010, lng: 75.8573 });

    const [selected, setSelected] = useState({});

    const onSelect = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "88vh",
        width: "100%"
    };    


    return (
        <div className='mapView'>
            <LoadScript
                googleMapsApiKey='AIzaSyBa4P64iB-m5WmAwAZX3vH90iX-5s11w4A'>

                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={9}
                    center={currentPosition}>

                    {
                         props.myData.map(item => {
                            return (
                                <Marker key={item.id}
                                    icon={markerIcon}
                                    position={{ lat: item.lastRunningState.lat, lng: item.lastRunningState.lng }}
                                    onClick={() => onSelect(item)}
                                />
                            )
                        })
                    }
                    {
                        selected.location &&
                        (
                            <InfoWindow
                                position={selected.location}
                                clickable={true}
                                onCloseClick={() => setSelected({})}
                            >
                                <p>{selected.name}</p>
                            </InfoWindow>
                        )
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default MapView
