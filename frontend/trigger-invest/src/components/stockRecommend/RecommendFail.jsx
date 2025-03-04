import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchVolumeRankData from "../common/hooks/useFetchVolumeRankData";
import useFetchAmountRankData from "../common/hooks/useFetchAmountRankData";
import useFetchFluctuationUpRankData from "../common/hooks/useFetchFluctuationUpRankData";
import useFetchFluctuationDownRankData from "../common/hooks/useFetchFluctuationDownRankData";
import { COLORS } from "../common/utils";
import "./RecommendFail.css";

function RecommendFail() {
  const navigate = useNavigate();

  const { volumeRankData } = useFetchVolumeRankData();
  const { amountRankData } = useFetchAmountRankData();
  const { fluctuationUpRankData } = useFetchFluctuationUpRankData();
  const { fluctuationDownRankData } = useFetchFluctuationDownRankData();

  const [rankOption, setRankOption] = useState("volume");
  const [rankData, setRankData] = useState([]);

  useEffect(() => {
    if (rankOption === "volume" && volumeRankData) {
      setRankData(volumeRankData);
    } else if (rankOption === "amount" && amountRankData) {
      setRankData(amountRankData);
    } else if (rankOption === "fluctuationUp" && fluctuationUpRankData) {
      setRankData(fluctuationUpRankData);
    } else if (rankOption === "fluctuationDown" && fluctuationDownRankData) {
      setRankData(fluctuationDownRankData);
    }
  }, [
    rankOption,
    volumeRankData,
    amountRankData,
    fluctuationUpRankData,
    fluctuationDownRankData,
  ]);

  return (
    <div className="recommend-fail-container">
      <h2 className="recommend-title">소비 내역이 등록되지 않았습니다.</h2>

      {/* 탭 메뉴 */}
      <div className="tab-container">
        {[
          { key: "volume", label: "거래량" },
          { key: "amount", label: "거래금액" },
          { key: "fluctuationUp", label: "급상승" },
          { key: "fluctuationDown", label: "급하락" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${rankOption === tab.key ? "active" : ""}`}
            onClick={() => setRankOption(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 데이터 테이블 */}
      <table className="stock-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>종목명</th>
            <th>현재가</th>
            <th>전일 대비</th>
            <th>전일 대비율</th>
          </tr>
        </thead>
        <tbody>
          {rankData.slice(0, 10).map((item, index) => (
            <tr
              key={index}
              onClick={() =>
                navigate(`/stock/${item.mksc_shrn_iscd || item.stck_shrn_iscd}`)
              }
            >
              <td>{item.data_rank}</td>
              <td>{item.hts_kor_isnm}</td>
              <td
                style={{
                  color: item.prdy_vrss > 0 ? COLORS.positive : COLORS.negative,
                }}
              >
                {Number(item.stck_prpr).toLocaleString()}
              </td>
              <td
                style={{
                  color: item.prdy_vrss > 0 ? COLORS.positive : COLORS.negative,
                }}
              >
                {Number(item.prdy_vrss).toLocaleString()}
              </td>
              <td
                style={{
                  color: item.prdy_vrss > 0 ? COLORS.positive : COLORS.negative,
                }}
              >
                {Number(item.prdy_ctrt).toLocaleString()}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecommendFail;
