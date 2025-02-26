import { useNavigate } from "react-router-dom";
import useFetchVolumeRankData from "../common/hooks/useFetchVolumeRankData";
import { useEffect, useState } from "react";
import useFetchFluctuationRankData from "../common/hooks/useFetchFluctuationRankData";
import useFetchSearchRankData from "../common/hooks/useFetchSearchRankData";

function RecommendFail() {
    const navigate = useNavigate();

    const goToHousehold = () => {
        navigate('/household');
    };

    const { volumeRankData } = useFetchVolumeRankData();
    const { fluctuationRankData } = useFetchFluctuationRankData();
    const { searchRankData } = useFetchSearchRankData();

    const [rankOption, setRankOption] = useState("volume");
    const [rankData, setRankData] = useState(null);

    useEffect(() => {
        if (rankOption === "volume" && volumeRankData) {
            setRankData(volumeRankData);
        } else if (rankOption === "fluctuation" && fluctuationRankData) {
            setRankData(fluctuationRankData);
        } else if (rankOption === "search" && searchRankData) {
            setRankData(searchRankData);
        }
    }, [rankOption, volumeRankData, fluctuationRankData, searchRankData]);

    if (!rankData) {
        return <div>📡 데이터 로딩 중...</div>;
    }

    return (
        <>
            <h2>추천 종목이 설정되지 않았습니다.</h2>
            <button onClick={goToHousehold}>가계부 작성</button>

            <div>
                {["volume", "fluctuation", "search"].map(option => (
                    <button key={option} onClick={() => setRankOption(option)}>
                        {option === "volume" ? "거래량 순위" : option === "fluctuation" ? "등락률 순위" : "조회 순위"}
                    </button>
                ))}
            </div>

            {rankData.slice(0, 10).map((item, index) => (
                <div key={index}>
                    {rankOption === "search" ? (
                        <>
                            <span>{index + 1}   </span>
                            <span>{item.mksc_shrn_iscd}</span>
                        </>
                    ) : (
                        <>
                            <span>{item.data_rank}   </span>
                            <span>{item.hts_kor_isnm}    </span>
                            <span>{item.stck_prpr}   </span>
                            <span>{item.avrg_vol || item.prdy_vrss}   </span>
                            <span>{item.prdy_ctrt}</span>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default RecommendFail;
