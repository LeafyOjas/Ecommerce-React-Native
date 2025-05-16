import { useEffect, useState } from "react";

const useFetch = (url: string, onSuccess = (_data: any) => { }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
                setLoading(false);
                onSuccess(json);
            } catch (err) {
                console.error('Error fetching data:', err);
                setLoading(false);
            }
        })();
    }, []);

    return { data, loading };
}

export default useFetch;