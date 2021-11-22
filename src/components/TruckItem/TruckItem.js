import React, { useState } from 'react'
import './TruckItem.css'

function TruckItem(props) {

    // function timeConverter(){
    //     var a = new Date(1637340103000);
    //     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //     var year = a.getFullYear();
    //     var month = months[a.getMonth()];
    //     var date = a.getDate();
    //     var hour = a.getHours();
    //     var min = a.getMinutes();
    //     var sec = a.getSeconds();
    //     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    //     return time;
    //   }
    
    const [truckNumber, setTruckNumber] = useState()

    const [speed, setSpeed] = useState('10KM/hr')
    const [lastUpdatedTime, setLastUpdatedTime] = useState('22 min')
    const [lastStoppedOrRunningState, setLastStoppedOrRunningState] = useState('Stopped')
    const [lastStoppedOrRunningTime, setLastStoppedOrRunningTime] = useState('11 d')

    React.useEffect(() => {
        setTruckNumber(props.truckNumber)
    }, [props])

    return (
        <div className='truckItemContainer'>
            <h3 id='vehicleNumber'>
                {truckNumber}
                <i className="bi bi-truck" id='truckIcon' ></i>
            </h3>
            <p id='lastUpdatedTime'>{lastUpdatedTime}</p>
            <p id='lastStoppedOrRunningState'> {lastStoppedOrRunningState}  since last {lastStoppedOrRunningTime}</p>
            <p id='speed'> {speed}</p>
        </div>
    )
}

export default TruckItem
