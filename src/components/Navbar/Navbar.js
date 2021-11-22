import React, { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar(props) {

    //api fetching
    const [myData, setMyData] = useState([]);

    //navbar dynamic data from api
    const [stoppedTrucks, setStoppedTrucks] = useState(5)
    const [runningTrucks, setRunningTrucks] = useState(1)
    const [errorTrucks, setErrorTrucks] = useState(6)
    const [idleTrucks, setIdleTrucks] = useState(9)

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

        //update trucks state
        let update = function () {
            myData.reduce((acc, curr) => {
                if (curr.lastRunningState.truckRunningState) {
                    acc++
                }
                setRunningTrucks(acc)
                return acc
            }, 0)
            setStoppedTrucks(myData.length - runningTrucks)
            setErrorTrucks(myData.length - runningTrucks)
            setIdleTrucks(myData.length - runningTrucks)
        }
        update()
    }, [myData, runningTrucks])

    //select dropdown multiple
    //truck selected
    function truckSelected() {
        console.log('sdc');
    }

    return (

        <div className='myNavbar'>
            <ul>
                <li onClick={() => { props.getTruckStatus("total") }}>
                    Total Trucks
                    <p>{myData.length}</p>
                </li>
                <li onClick={() => { props.getTruckStatus("running") }}>
                    Running Trucks
                    <p>{runningTrucks}</p>
                </li>
                <li onClick={() => { props.getTruckStatus("stopped") }}>
                    Stopped Trucks
                    <p>{stoppedTrucks}</p>
                </li>
                <li onClick={() => { props.getTruckStatus("idle") }}>
                    Idle Trucks
                    <p>{idleTrucks}</p>
                </li>
                <li onClick={() => { props.getTruckStatus("error") }}>
                    Error Trucks
                    <p>{errorTrucks}</p>
                </li>

                <select id='selectBox' required onChange={truckSelected}>
                    <option value="" disabled hidden>Select your option</option>
                    {
                        myData.map((item) => (
                            <option value={item.truckNumber} key={item.id} >{item.truckNumber}</option>
                        ))
                    }
                </select>
            </ul>
        </div>

    )
}


export default Navbar
