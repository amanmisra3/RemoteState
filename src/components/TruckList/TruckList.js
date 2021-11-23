import React, { useState } from 'react'
import TruckItem from '../TruckItem/TruckItem'
import './TruckList.css'

function TruckList(props) {

    const [flag] = useState(false)

    return (
        <div className='truckListContainer'>

            {
                flag ? <>
                    <TruckItem truckNumber={'axax'} />
                </> :
                    <>{
                        props.myData && props.myData.length > 0 && props.myData.map((item) => (

                            <TruckItem key={item.id} myData={item} />
                        ))
                    }</>
            }

        </div>
    )
}

export default TruckList
