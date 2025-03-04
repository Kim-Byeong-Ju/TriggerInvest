import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, act } from "react";
import "./Info.css";

function Info({ infoData, newsData, relatedData }) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 감지
  const [activeTab, setActiveTab] = useState("financial");

  // 페이지 이동 시 activeTab을 "financial"로 초기화
  useEffect(() => {
    setActiveTab("financial");
  }, [location.pathname]);
  function formatProfit(value) {
    const profit = Number(Math.abs(value)) * 10000000;
    const isPositive = value > 0;
    if (profit >= 1000000000000) {
      return (profit / 1000000000000).toFixed(1) + "조원";
    } else if (profit >= 10000000000) {
      return (profit / 10000000000).toFixed(1) + "조원";
    } else if (profit >= 100000000) {
      return (
        (profit / 100000000).toLocaleString(undefined, {
          minimumFractionDigits: 1,
        }) + "억원"
      );
    } else {
      return (profit * isPositive).toLocaleString() + "원";
    }
  }
  const totalProfit = formatProfit(infoData.totalProfit);
  const netProfit = formatProfit(infoData.netProfit);
  return (
    <>
      {/* 탭 버튼 */}
      <div className="tabs">
        <button
          className={activeTab === "financial" ? "active" : ""}
          onClick={() => setActiveTab("financial")}
        >
          종목 정보
        </button>
        <button
          className={activeTab === "news" ? "active" : ""}
          onClick={() => setActiveTab("news")}
        >
          뉴스
        </button>
        <button
          className={activeTab === "related" ? "active" : ""}
          onClick={() => setActiveTab("related")}
        >
          동종 업계
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === "financial" && (
        <div className="tab-content">
          {/* 상단: 재무 정보 */}
          <div className="section">
            <h3>재무 정보</h3>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>상장일자</th>
                  <td>{infoData.listingDate}</td>
                </tr>
                <tr>
                  <th>매출 총이익</th>
                  <td>{totalProfit}</td>
                </tr>
                <tr>
                  <th>당기 순이익</th>
                  <td>{netProfit}</td>
                </tr>
                <tr>
                  <th>순이익률</th>
                  <td>{Number(infoData.netProfitRate).toLocaleString()}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "news" && (
        <div className="tab-content">
          <div className="section">
            <h3>관련 뉴스</h3>
            <ul className="info-list">
              {newsData.map((news, index) => (
                <li key={index}>{news.hts_pbnt_titl_cntt}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "related" && (
        <div className="tab-content">
          <div className="section">
            <h3 className="industry">동종 업계 주식</h3>
            <ul className="info-list">
              {relatedData.map((stock, index) => (
                <li
                  key={index}
                  className="clickable-item"
                  onClick={() => navigate(`/stock/${stock.tickerId}`)}
                >
                  {stock.tickerName} ({stock.tickerId})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Info;
