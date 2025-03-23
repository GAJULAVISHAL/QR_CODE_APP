import axios from "axios"
import { useEffect, useState } from "react"
export interface pass{
    id:number,
    personName : string,
    eventName : string,
    price : number,
    eventDate : string,
    qrCodeUrl : string
}

export const usePass = ({ id }: { id: string }) => {
    const [loadingPass, setLoadingPass] = useState(true);
    const [pass, setPass] = useState<pass>();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/pass/${id}`, {
        })
            .then(response => {
                setPass(response.data.blog);
                setLoadingPass(false);
            })
    }, [])

    return {
        loadingPass,
        pass
    }
}

export const usePasses = ()=>{
    const [loading, setLoading] = useState<boolean>(true)
    const [passes, setPasses] = useState<pass[]>()
    useEffect(()=>{
        const id = localStorage.getItem("userID")
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/passes/${id}`)
        .then(response=>{
            setPasses(response.data.passes)
            setLoading(false)
        })
    },[])
    return{
        loading,passes
    }
}