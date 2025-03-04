import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from "./AnalysisModal.module.css"; // 스타일 적용

const categories = [
  { id: 1, label: "🍔 식비" },
  { id: 2, label: "🔌 가전제품" },
  { id: 3, label: "🐶 애완동물" },
  { id: 4, label: "📡 인터넷/TV 요금" },
  { id: 5, label: "💰 세금/보험료" },
  { id: 6, label: "🚗 차량 유지비" },
  { id: 7, label: "🛋 가구/인테리어" },
  { id: 8, label: "☕ 커피" },
  { id: 9, label: "🍻 술" },
  { id: 10, label: "🚌 교통비" },
  { id: 11, label: "📺 컨텐츠 소비" },
  { id: 12, label: "⚽ 스포츠" },
  { id: 13, label: "🛍 쇼핑" },
  { id: 14, label: "🎮 게임" },
  { id: 15, label: "💄 미용(화장품)" },
  { id: 16, label: "📖 교육" },
  { id: 17, label: "🏦 저축" },
  { id: 18, label: "🩺 의료/건강" },
  { id: 19, label: "📞 통신비" },
  { id: 20, label: "✈️ 여행" },
  { id: 21, label: "🎊 경조사" },
  { id: 22, label: "🏠 주거비" },
  { id: 23, label: "🧴 생필품" },
];

const AnalysisModal = ({ show, handleClose, events }) => {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      handleClose();
    }
  };

  // 각 섹터별 소비 합계 계산
  const sectorData = events.reduce((acc, event) => {
    const { sectorId, amount } = event;
    if (!acc[sectorId]) {
      acc[sectorId] = 0;
    }
    acc[sectorId] += amount;
    return acc;
  }, {});

  // 정렬된 데이터 생성: amount 내림차순
  const pieData = Object.entries(sectorData)
    .map(([sectorId, amount]) => {
      const category = categories.find((c) => c.id === Number(sectorId));
      return {
        name: category ? category.label : `기타 (${sectorId})`,
        value: amount,
      };
    })
    .sort((a, b) => b.value - a.value); // amount 값 기준 내림차순 정렬

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28DFF",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
  ];

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <h2>소비 분석</h2>
        <div className={styles.chartContainer}>
          <PieChart width={600} height={500}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={160} // 크기 조정
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(1)}%`
              } // 내부 라벨
              labelLine={true} // 선 제거
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
            />{" "}
            {/* 범례 아래 배치 */}
          </PieChart>
        </div>
        <button className={styles.closeButton} onClick={handleClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default AnalysisModal;
