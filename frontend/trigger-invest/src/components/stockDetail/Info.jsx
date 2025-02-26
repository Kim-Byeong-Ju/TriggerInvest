function Info({ infoData }) {
    return (
        <>
        <div>상장일자 : {infoData.listing_date}</div>
        <div>매출 총이익 : {infoData.total_profit}</div>
        <div>당기 순이익 : {infoData.net_profit}</div>
        <div>순이익률 : {infoData.net_profit_rate}</div>
        </>
    )
}

export default Info;