import React, { useState } from "react";
import Weight from "./Weight";
import Similarity from "./Similarity";
import "./RecommendSuccess.css";

const RecommendSuccess = ({ data }) => {
  const [mode, setMode] = useState("weight");

  return (
    <div className="recommend-container">
      {/* 토글 버튼 */}
      <div className="toggle-buttons" data-mode={mode}>
        <button
          className={mode === "weight" ? "active" : ""}
          onClick={() => setMode("weight")}
        >
          트리거 포인트
        </button>
        <button
          className={mode === "similarity" ? "active" : ""}
          onClick={() => setMode("similarity")}
        >
          싱크로율
        </button>
        <div
          className="toggle-background"
          style={{
            transform:
              mode === "weight" ? "translateX(0%)" : "translateX(100%)",
          }}
        ></div>
      </div>

      {mode === "weight" && <Weight data={data} />}
      {mode === "similarity" && <Similarity />}
    </div>
  );
};

export default RecommendSuccess;
