import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options = {}, trigger = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios({
                    url,
                    ...options,
                });
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Trigger the fetch if the URL is provided
        if (url) fetchData();
    }, [url, JSON.stringify(options), trigger]);

    return { data, error, loading };
};

export default useFetch;