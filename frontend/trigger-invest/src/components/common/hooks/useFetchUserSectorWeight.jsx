import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUserSectorWeight = (userId) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/users/transactions/sector-weights`, {
                    params: { userId } // ✅ Axios는 이렇게 쿼리 파라미터를 보낼 수 있음
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, loading };
};

export default useFetchUserSectorWeight;
