function Symbol({ symbolData, currentData }) {
    return (
        <>
        <div>{symbolData.prdt_abrv_name}</div>
        <div>{symbolData.prdt_eng_abrv_name}</div>
        <div>{symbolData.std_idst_clsf_cd_name}</div>
        <div>{currentData.stck_prpr}</div>
        <div>{currentData.prdy_vrss}</div>
        <div>{currentData.prdy_ctrt}</div>
        </>
    )
}

export default Symbol;