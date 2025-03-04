import { useParams } from "react-router-dom";
import { COLORS } from "../common/utils";
import "./Symbol.css";

function Symbol({ symbolData, currentData }) {
    const { stockCode } = useParams();

    return (
        <div>
            <div className="symbol-name">
                <span className="symbol-korean">{symbolData.prdt_abrv_name}</span>
                <span className="symbol-english">({symbolData.prdt_eng_abrv_name})</span>
                <span className="symbol-code">{stockCode}</span>
            </div>
            <div className="symbol-price">
                <span className="current-price">{Number(currentData.stck_prpr).toLocaleString()}원</span>
                <span className="price-change" style={{ color: currentData.prdy_vrss > 0 ? COLORS.positive : currentData.prdy_vrss < 0 ? COLORS.negative : COLORS.neutral }}>
                    {Number(currentData.prdy_vrss).toLocaleString()}원 ({currentData.prdy_ctrt}%)
                </span>
            </div>
        </div>
    );
}

export default Symbol;
