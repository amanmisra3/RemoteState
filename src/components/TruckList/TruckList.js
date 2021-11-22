import React, {  useEffect } from 'react'
import TruckItem from '../TruckItem/TruckItem'
import './TruckList.css'

function TruckList(props) {


    // function filterData() {
    //     return props.myData.filter((item) => {
    //         switch (param) {
    //             case 'total':
    //                 return item
    //             case 'running':
    //                 return item.lastRunningState.truckRunningState
    //             case 'stopped':
    //                 return !item.lastRunningState.truckRunningState
    //             case 'idle':
    //                 return item
    //             case 'error':
    //                 return item
    //             default:
    //                 return null
    //         }
    //     })
    // }

    // useEffect(() => {    
    //     filterData()
    // }, [param, props])



    return (
        <div className='truckListContainer'>

            {
                props.myData && props.myData.length > 0 && props.myData.map((item) => (

                    <TruckItem key={item.id} truckNumber={item.truckNumber} />
                ))
            }

        </div>
    )
}

export default TruckList
