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
            fetch('https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactihttps://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypointhttps://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint')
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

    useEffect(() => {
        let filteredData = myData.filter((item) => {
            switch (param) {
                case 'total':
                    return item
                case 'running':
                    return item.lastRunningState.truckRunningState
                case 'stopped':
                    return !item.lastRunningState.truckRunningState
                case 'idle':
                    return item
                case 'error':
                    return item
                default:
                    return item
            }
        })
        setFilterData(filteredData)

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
