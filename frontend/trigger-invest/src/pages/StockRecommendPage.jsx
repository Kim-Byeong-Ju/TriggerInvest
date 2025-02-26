import RecommendSuccess from '../components/stockRecommend/RecommendSuccess';
import RecommendFail from '../components/stockRecommend/RecommendFail';

function StockRecommendPage () {
    const recommendFlag = false;

    if (recommendFlag) {
        return <RecommendSuccess />
    } else {
        return <RecommendFail />
    }
}

export default StockRecommendPage;