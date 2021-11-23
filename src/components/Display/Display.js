import React, { useState, useEffect } from 'react'
import './Display.css'
import TruckList from '../TruckList/TruckList';
import MapView from '../MapView/MapView'

function Display(props) {

    const [myData, setMyData] = useState([]);
    const [param, setParam] = useState('')
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        const getData = () => {
            fetch('https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint')
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    setMyData(myJson.data)
                });
        }
        getData()
        //
        setParam(props.truckStatusText)
    }, [props])

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
    

    useEffect(() => {
        let filteredData = myData.filter((item) => {
            switch (param) {
                case 'total':
                    return item
                case 'running':
                    return item.lastRunningState.truckRunningState
                case 'stopped':
                    return (!item.lastRunningState.truckRunningState && !item.lastWaypoint.ignitionOn)
                case 'idle':
                    return (!item.lastRunningState.truckRunningState && item.lastWaypoint.ignitionOn)
                case 'error':
                    return (lastLocationUpdate(item.lastWaypoint.createTime)>4 && !flag)
                default:
                    return item
            }
        })
        setFilterData(filteredData)
        // eslint-disable-next-line
    }, [myData, param])

    return (
        <div>
            <div id='sideBySide'>
                {<>
                    <div id='truck'><TruckList myData={filterData} truckStatusText={props.truckStatusText} /></div>
                    <div id='map'><MapView myData={filterData} truckStatusText={props.truckStatusText} /></div>
                </>}

            </div>
        </div>

    )
}

export default Display
