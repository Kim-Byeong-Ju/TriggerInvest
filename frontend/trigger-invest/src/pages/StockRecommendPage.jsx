import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecommendSuccess from "../components/stockRecommend/RecommendSuccess";
import RecommendFail from "../components/stockRecommend/RecommendFail";
import useFetchUserSectorWeight from "../components/common/hooks/useFetchUserSectorWeight";
import LoadingSpinner from "../components/common/loading/LoadingSpinner";

function StockRecommendPage() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const { data, loading } = useFetchUserSectorWeight(userId);
    const [recommendFlag, setRecommendFlag] = useState(null);

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        if (!loading) {
            setRecommendFlag(data);
        }
    }, [data, loading, userId, navigate]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!recommendFlag || recommendFlag.length === 0) {
        return <RecommendFail />;
    }

    return <RecommendSuccess data={recommendFlag} />;
}

export default StockRecommendPage;
