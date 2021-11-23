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

        //update trucks state
        let update = function () {
            myData.reduce((acc, curr) => {
                if (curr.lastRunningState.truckRunningState) {
                    acc++
                }
                setRunningTrucks(acc)
                return acc
            }, 0)
            myData.reduce((acc, curr) => {
                if (!curr.lastRunningState.truckRunningState && !curr.lastWaypoint.ignitionOn) {
                    acc++
                }
                setStoppedTrucks(acc)
                return acc
            }, 0)
            myData.reduce((acc, curr) => {
                if (!curr.lastRunningState.truckRunningState && curr.lastWaypoint.ignitionOn) {
                    acc++
                }
                setIdleTrucks(acc)
                return acc
            }, 0)
            myData.reduce((acc, curr) => {
                if (lastLocationUpdate(curr.lastWaypoint.createTime) > 4 && !flag) {
                    acc++
                }
                setErrorTrucks(acc)
                return acc
            }, 0)
        }
        update()
        // eslint-disable-next-line
    }, [myData, runningTrucks])



    //select dropdown multiple
    //truck selected

    const [valueTruckNumber, setValueTruckNumber] = useState()

    const truckSelected = (event) => {
        console.log('sdc');
        setValueTruckNumber(event.target.value)
        console.log(valueTruckNumber);
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

                <select id='selectBox' required onChange={truckSelected} value={valueTruckNumber} defaultValue={'DEFAULT'} >
                    <option value="DEFAULT" disabled hidden>Find Your Truck...</option>
                    {
                        myData.map((item) => (
                            <option value={item.truckNumber} key={item.id} >{item.truckNumber}</option>
                        ))
                    }
                </select>

                {/* <Multiselect options={selectData} displayValue='myData.id' id='abc' /> */}
                {/* <Select options={selectData} /> */}

            </ul>
        </div>

    )
}


export default Navbar
