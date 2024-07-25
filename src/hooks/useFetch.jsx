import axios from "../api"
import { useEffect, useState } from "react"

const useFetch = (ENDPOINT) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                setLoading(true)
                const response = await axios(ENDPOINT)
                setData(response.data?.payload)
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        loadData()
    }, [ENDPOINT])

    return [ data, loading ]

}

export default useFetch