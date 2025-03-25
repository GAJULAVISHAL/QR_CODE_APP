import axios from "axios"
import { useEffect, useState } from "react"
export interface pass {
    id: number,
    personName: string,
    eventName: string,
    price: number,
    eventDate: string,
    qrCodeUrl: string
}

export interface Event{
    name : string,
    price : number,
    date : string
}

export const usePass = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [pass, setPass] = useState<pass | undefined>(undefined);

    useEffect(() => {
        if (!id) return;
        const fetchPass = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pass/${id}`)
                setPass(response.data.pass);
            } catch (error) {
                console.error("Error fetching pass:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPass();
    }, [id]);

    return { loading, pass };
}

export const usePasses = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [passes, setPasses] = useState<pass[]>()
    useEffect(() => {
        const id = localStorage.getItem("userId")
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/passes/${id}`)
            .then(response => {
                setPasses(response.data.passes)
                setLoading(false)
            })
    }, [])
    return {
        loading, passes
    }
}
