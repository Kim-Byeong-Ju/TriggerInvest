import { useState, useRef } from "react";
import "./Weight.css";
import { useNavigate } from "react-router-dom";

function Weight({ data }) {
    const navigate = useNavigate();

    const [selectedSector, setSelectedSector] = useState("전체");
    const categoryScrollRef = useRef(null);
    const scrollRef = useRef(null);

    const filteredData = selectedSector === "전체"
        ? data.flatMap(sector => sector.tickers)
        : data.find(sector => sector.sectorName === selectedSector)?.tickers || [];

    return (
        <>
            {/* 카테고리 선택 */}
            <div className="category-tags" ref={categoryScrollRef}>
                <button
                    className={`sector-button ${selectedSector === "전체" ? "active" : ""}`}
                    onClick={() => setSelectedSector("전체")}
                >
                    전체
                </button>
                {data.map((sector, index) => (
                    <button
                        key={sector.sectorId}
                        className={`sector-button ${index < 3 ? `rank-${index + 1}` : ""} ${selectedSector === sector.sectorName ? "active" : ""}`}
                        onClick={() => setSelectedSector(sector.sectorName)}
                    >
                        <span>
                            {index === 0 && "🏆"}
                            {index === 1 && "🥈"}
                            {index === 2 && "🥉"}
                            {sector.sectorName}
                        </span>
                    </button>
                ))}
            </div>

            {/* 캐러셀 컨테이너 */}
            <div className="carousel-container">
                <button className="carousel-button left" onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })}>&lt;</button>
                <div className="carousel-wrapper" ref={scrollRef}>
                    {filteredData.map((stock, index) => (
                        <div className="stock-card" key={index} onClick={() => navigate(`/stock/${stock.tickerId}`)}>
                            <h3>{stock.tickerName} ({stock.tickerId})</h3>
                            <p className="stock-industry">{stock.industryGroupName} 업종</p>
                            <p className="stock-description">{stock.description}</p>
                        </div>
                    ))}
                </div>
                <button className="carousel-button right" onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })}>&gt;</button>
            </div>
        </>
    );
}

export default Weight;
