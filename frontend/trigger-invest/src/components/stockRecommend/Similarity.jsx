import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/loading/LoadingSpinner";
import useFetchRecommendData from "../common/hooks/useFetchRecommendData";
import styles from "./Similarity.module.css"; // 📌 CSS Module import

function Similarity() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { stocks, setStocks } = useFetchRecommendData(userId);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (stocks.length > 0) {
      setIsLoading(false);
    }
  }, [stocks]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.carouselContainer}>
          <button
            className={`${styles.carouselButton} ${styles.left}`}
            onClick={() => scroll("left")}
          >
            &lt;
          </button>
          <div className={styles.carouselWrapper} ref={scrollRef}>
            {stocks.map((stock, index) => (
              <div 
                className={styles.stockCard} 
                key={index} 
                onClick={() => navigate(`/stock/${stock.tickerId}`)}
              >
                {/* 🏆 순위 배지 추가 */}
                <div className={styles.rankBadge}>{index + 1}</div>

                <h3 className={styles.stockTitle}>
                  {stock.tickerName} ({stock.tickerId})
                </h3>
                <p className={styles.stockIndustry}>
                  {stock.industryGroupName} 업종
                </p>
                <p className={styles.stockDescription}>{stock.description}</p>
              </div>
            ))}
          </div>
          <button
            className={`${styles.carouselButton} ${styles.right}`}
            onClick={() => scroll("right")}
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
}

export default Similarity;
