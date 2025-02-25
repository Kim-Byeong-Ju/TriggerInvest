import requests
import os
from dotenv import load_dotenv

# 환경 변수
load_dotenv()

APP_KEY = os.getenv("APP_KEY")
APP_SECRET = os.getenv("APP_SECRET")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")


def get_stock_info(domain: str, url: str, tr_id: str, stock_code: str) -> tuple:
    headers = {
        "content-type": "application/json",
        "authorization": f"Bearer {ACCESS_TOKEN}",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET,
        "tr_id": tr_id,
    }

    params = {
        "PDNO": stock_code,
        "PRDT_TYPE_CD": "300"
    }

    response = requests.get(f"{domain}{url}", headers=headers, params=params)

    if response.status_code == 200:
        return (
            response.json().get("output").get("idx_bztp_mcls_cd_name"),  # 산업 그룹 ID
            response.json().get("output").get("prdt_abrv_name"),  # 종목명
        )

    else:
        print(f"Error {response.status_code}: {response.text}")
        return "", ""


def get_prevent_stock_info(domain: str, url: str, tr_id: str, stock_code: str) -> tuple:
    headers = {
        "content-type": "application/json",
        "authorization": f"Bearer {ACCESS_TOKEN}",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET,
        "tr_id": tr_id,
    }

    params = {
        "FID_COND_MRKT_DIV_CODE": "J",
        "FID_INPUT_ISCD": stock_code
    }

    response = requests.get(f"{domain}{url}", headers=headers, params=params)

    if response.status_code == 200:
        return (
            response.json().get("output")[0].get("stck_prpr"),  # 주식 현재가
            response.json().get("output")[0].get("prdy_vrss"),  # 전일 대비량
            response.json().get("output")[0].get("prdy_ctrt"),  # 전일 대비율
            response.json().get("output")[0].get("prdy_vrss_sign")  # 전일 대비 부호
        )
    else:
        print(f"Error {response.status_code}: {response.text}")
        return ("", "", "", "")


def generate_insert_sql(stock_code, industry_group_id, name, current_price, prev_diff, prev_diff_rate, prev_diff_sign) -> list:
    result = []

    query = f"INSERT INTO {TABLE_NAME} (ticker_id, industry_group_id, name, current_price, prev_diff, prev_diff_rate, prev_diff_sign, create_timestamp, update_timestampe)\n"
    query += f"VALUES ('{stock_code}', '{industry_group_id}', '{name}', {current_price}, {prev_diff}, {prev_diff_rate}, '{prev_diff_sign}', SYSTIMESTAMP, SYSTIMESTAMP);\n"
    result.append(query)
    return result


if __name__ == "__main__":
    import KOSPI200
    import time

    # SQL 테이블명
    TABLE_NAME = "tickers"

    all_sql_statements = []
    for STOCK_CODE in KOSPI200.kospi_200.keys():
        print(f"종목 코드: {STOCK_CODE}")

        # 산업 그룹 ID, 종목명
        industry_group_id, name = get_stock_info(
            domain="https://openapi.koreainvestment.com:9443",
            url="/uapi/domestic-stock/v1/quotations/search-stock-info",
            tr_id="CTPF1002R",
            stock_code=STOCK_CODE
        )
        time.sleep(0.5)

        # 주식 현재가 정보
        current_price, prev_diff, prev_diff_rate, prev_diff_sign = get_prevent_stock_info(
            domain="https://openapi.koreainvestment.com:9443",
            url="/uapi/domestic-stock/v1/quotations/inquire-ccnl",
            tr_id="FHKST01010300",
            stock_code=STOCK_CODE
        )
        time.sleep(0.5)

        if industry_group_id or name or current_price or prev_diff or prev_diff_rate or prev_diff_sign:
            sql_statements = generate_insert_sql(STOCK_CODE, industry_group_id, name, current_price, prev_diff, prev_diff_rate, prev_diff_sign)
            all_sql_statements.extend(sql_statements)

    # SQL 파일 저장
    sql_file_path = "./주식 종목.sql"
    with open(sql_file_path, 'w', encoding='utf-8') as sql_file:
        for sql in all_sql_statements:
            sql_file.write(sql + "\n")
