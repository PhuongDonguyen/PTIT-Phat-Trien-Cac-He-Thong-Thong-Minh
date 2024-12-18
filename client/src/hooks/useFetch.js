import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
    const { page = 1, limit = 10 } = options;
    const [data, setData] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            setData(null);

            try {
                const response = await axios.get(url, {
                    params: {
                        page,
                        limit,
                    },
                });
                const { data: items, pagination } = response.data;
                setData(items);
                setPagination(pagination);
            } catch (err) {
                console.log(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Trigger the fetch if the URL is provided
        fetchData();
    }, [url, page, limit]);

    return { data, pagination, error, loading };
};

export default useFetch;