import requests
import os
from dotenv import load_dotenv

# 환경 변수
load_dotenv()

APP_KEY = os.getenv("APP_KEY")
APP_SECRET = os.getenv("APP_SECRET")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")


def get_stock_info(domain: str, url: str, tr_id: str, stock_code: str) -> str:
    headers = {
        "content-type": "application/json",
        "authorization": f"Bearer {ACCESS_TOKEN}",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET,
        "tr_id": tr_id,
    }

    params = {
        "PRDT_TYPE_CD": "300",
        "PDNO": stock_code
    }

    response = requests.get(f"{domain}{url}", headers=headers, params=params)

    if response.status_code == 200:
        return response.json().get("output").get("scts_mket_lstg_dt")  # 상장일자
    else:
        print(f"Error {response.status_code}: {response.text}")
        return ""


def get_income_statement(domain: str, url: str, tr_id: str, stock_code: str) -> tuple:
    headers = {
        "content-type": "application/json",
        "authorization": f"Bearer {ACCESS_TOKEN}",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET,
        "tr_id": tr_id,
    }

    params = {
        "FID_DIV_CLS_CODE": "1",
        "fid_cond_mrkt_div_code": "J",
        "fid_input_iscd": stock_code
    }

    response = requests.get(f"{domain}{url}", headers=headers, params=params)

    if response.status_code == 200:
        return (
            response.json().get("output")[0].get("sale_totl_prfi"),  # 매출 총이익
            response.json().get("output")[0].get("thtr_ntin")  # 당기 순이익
        )
    else:
        print(f"Error {response.status_code}: {response.text}")
        return "", ""


def get_profit_ratio(domain: str, url: str, tr_id: str, stock_code: str) -> str:
    headers = {
        "content-type": "application/json",
        "authorization": f"Bearer {ACCESS_TOKEN}",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET,
        "tr_id": tr_id,
    }

    params = {
        "FID_DIV_CLS_CODE": "1",
        "fid_cond_mrkt_div_code": "J",
        "fid_input_iscd": stock_code
    }

    response = requests.get(f"{domain}{url}", headers=headers, params=params)

    if response.status_code == 200:
        return response.json().get("output")[0].get("sale_ntin_rate")  # 순이익률
    else:
        print(f"Error {response.status_code}: {response.text}")
        return ""


def generate_insert_sql(stock_code: str, listing_date: str, total_profit: str, net_profit: str, net_profit_rate: str) -> list:
    query = f"INSERT INTO financials (ticker_id, listing_date, total_profit, net_profit, net_profit_rate, create_timestamp, update_timestamp)\n"
    query += f"VALUES ('{stock_code}', TO_DATE('{listing_date}', 'YYYYMMDD'), {total_profit}, {net_profit}, {net_profit_rate}, SYSTIMESTAMP, SYSTIMESTAMP);\n"
    return [query]


if __name__ == "__main__":
    import KOSPI200
    import time

    # SQL 테이블명
    TABLE_NAME = "financials"

    all_sql_statements = []
    for STOCK_CODE in KOSPI200.kospi_200.keys():
        print(f"종목 코드: {STOCK_CODE}")

        # 상장일자
        listing_date = get_stock_info(
            domain="https://openapi.koreainvestment.com:9443",
            url="/uapi/domestic-stock/v1/quotations/search-stock-info",
            tr_id="CTPF1002R",
            stock_code=STOCK_CODE
        )
        time.sleep(0.5)

        # 매출 총이익, 당기 순이익
        total_profit, net_profit = get_income_statement(
            domain="https://openapi.koreainvestment.com:9443",
            url="/uapi/domestic-stock/v1/finance/income-statement",
            tr_id="FHKST66430200",
            stock_code=STOCK_CODE
        )
        time.sleep(0.5)

        # 순이익률
        net_profit_rate = get_profit_ratio(
            domain="https://openapi.koreainvestment.com:9443",
            url="/uapi/domestic-stock/v1/finance/profit-ratio",
            tr_id="FHKST66430400",
            stock_code=STOCK_CODE
        )
        time.sleep(0.5)

        if listing_date or total_profit or net_profit or net_profit_rate:
            sql_statements = generate_insert_sql(STOCK_CODE, listing_date, total_profit, net_profit, net_profit_rate)
            all_sql_statements.extend(sql_statements)

    # SQL 파일 저장
    sql_file_path = "./재무정보.sql"
    with open(sql_file_path, 'w', encoding='utf-8') as sql_file:
        for sql in all_sql_statements:
            sql_file.write(sql + "\n")
