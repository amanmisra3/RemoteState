import React, { } from 'react'
import './TruckItem.css'

function TruckItem(props) {

    //Last Update Time Calculation
    var flag = true
    const lastLocationUpdate = (givenTime) => {
        var x = new Date(givenTime)
        var y = new Date()
        var z = y - x
        var seconds = Math.abs(z) / 1000;
        var min = Math.abs(seconds) / 60
        var lastTime
        if (min > 60) {
            flag = false
            lastTime = Math.floor(min / 60)
        }
        else if (min < 60 && min > 1) {
            flag = true
            lastTime = Math.floor(min)
        }
        else {
            flag = true
            lastTime = Math.ceil(min)
        }
        return lastTime
    }

    const lastTime = lastLocationUpdate(props.myData.lastWaypoint.createTime)

    //Calculate Speed
    let truckSpeed = Math.floor(props.myData.lastWaypoint.speed)

    //Calculate last Running/Stopped state
    let lastRunningState = props.myData.lastRunningState.truckRunningState

    //Calculate last Running/Stopped time
    const lastRunningTime = lastLocationUpdate(props.myData.lastRunningState.stopStartTime)


    return (
        <div className='truckItemContainer' id={!flag && lastTime > 4 ? 'errorTrucks' : ``}>
            <h3 id='vehicleNumber'>
                {props.myData.truckNumber}
                <i className="bi bi-truck" id='truckIcon' ></i>
            </h3>
            <p id='lastUpdatedTime' style={!flag && lastTime > 4 ? { backgroundColor: 'red', color: 'white' } : {}} >{lastTime}
                {flag ? ' min' : ' hours'}
            </p>
            <p id='lastStoppedOrRunningState' style={!flag && lastTime > 4 ? { backgroundColor: 'red', color: 'white' } : {}}> {lastRunningState ? 'Running' : 'Stopped'}  since last {lastRunningTime}{flag ? ' min' : ' hours'} </p>
            <p id='speed' style={!flag && lastTime > 4 ? { backgroundColor: 'red', color: 'white' } : {}}> {truckSpeed} k/h</p>
        </div>
    )
}

export default TruckItem
