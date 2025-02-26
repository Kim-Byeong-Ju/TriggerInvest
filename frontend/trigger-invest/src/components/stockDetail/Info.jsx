function Info({ infoData, currentData }) {
    return (
        <>
        <div>{infoData.prdt_abrv_name}</div>
        <div>{infoData.prdt_eng_abrv_name}</div>
        <div>{infoData.std_idst_clsf_cd_name}</div>
        <div>{currentData.stck_prpr}</div>
        <div>{currentData.prdy_vrss}</div>
        <div>{currentData.prdy_ctrt}</div>
        </>
    )
}

export default Info;