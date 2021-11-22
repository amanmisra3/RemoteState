import React, { useEffect, useState } from "react";
import axios from "axios";

function API() {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactihttps://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypointhttps://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint"
            )
            .then((response) => {
                setMyData(response.data.data);
                console.log(response.data.data);
            })

    }, []);

    return (
        <div className='api'>
            <h1> Fetch API</h1>
            <div>
                {myData.map((item) => (
                    <ul key={item.id}>
                        <li>{item.truckNumber}</li>
                        <li>{item.createTime}</li>
                        <li>{item.lastRunningState.lat}</li>
                        <li>{item.lastRunningState.lng}</li>

                        {item.lastRunningState.truckRunningState ? <li>{item.lastRunningState.truckRunningState}</li> : 'false value'}
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default API;
