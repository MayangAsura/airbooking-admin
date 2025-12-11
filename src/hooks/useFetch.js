import {useState, useEffect} from "react"
import axios from 'axios'
import {LOCAL_URL} from "../api/local"
import { PROD_URL } from "../api/production"

const BASE_URL = process.env.SERVER_MODE === 'production'? PROD_URL : LOCAL_URL
export const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async ()=>{
            setLoading(true)
            try{
                const res = await axios.get(BASE_URL + url)
                console.log(res)
                setData(res.data.data)
            }catch(err){
                setError(true)
            }
            setLoading(false)

        }
        fetchData()
    },[url])

    const reFetch = async ()=>{
        setLoading(true)
        try{
            const res = axios.get(url)
            setData(res.data)
        }catch(err){
            setError(true)
        }
        setLoading(false)

    }

    return {data, loading, error, reFetch}
}

