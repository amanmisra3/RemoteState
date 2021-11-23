import React, { useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';


function API() {
    const [myData, setMyData] = useState([]);
    const [selectOptions, setSelectOptions] = useState([])
    const [setError] = useState(null);
    const [setIsLoaded] = useState(false);

    // const abc = async () => {

    // }

    useEffect(() => {
        fetch("https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactihttps://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypointhttps://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setMyData(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    useEffect(() => {

        console.log(myData);
        setSelectOptions(myData)

    }, [])

    console.log(myData);
    console.log(selectOptions);
    // setSelectOptions(myData)
    console.log(selectOptions);

    // useEffect(() => {
    //     const getData = () => {
    //         fetch('https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactihttps://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypointhttps://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint')
    //             .then(function (response) {
    //                 return response.json();
    //             })
    //             .then(function (myJson) {
    //                 setMyData(myJson.data)
    //             });
    //     }
    //     getData()

    //     setInterval(() => {
    //         setSelectOptions(myData)
    //         console.log(myData);
    //         console.log(selectOptions);
    //     }, 5000);
    //     console.log(myData);
    // }, [])

    return (
        <div className='api'>
            <h1> Fetch API</h1>
            <div>
                <Multiselect options={selectOptions} defaultValue='myData.truckNumber' />
            </div>
        </div>
    )
}

export default API;
